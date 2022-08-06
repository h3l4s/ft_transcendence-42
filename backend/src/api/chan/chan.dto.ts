import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsNotEmptyObject, IsArray } from 'class-validator';

export class CreateChanDto
{
	@IsString()
	@IsNotEmpty()
	public name: string;

	@IsNumber()
	@IsNotEmpty()
	public ownerId: number;

	@IsArray()
	@IsNotEmpty()
	@IsOptional()
	public usersId: number[];

	@IsString()
	@IsNotEmpty()
	public type: 'public' | 'private' | 'protected' | 'direct';

	@IsNotEmpty()
	@IsOptional()
	@Transform((hash) =>
	{
		const str: any = hash;
		let ret = 0;
		for (let i = 0; i < str.length; i++)
		{
			const char = str.charCodeAt(i);
			ret = ((ret << 5) - ret) + char;
			ret = ret & ret; // Convert to 32bit integer
		}
		return (ret);
	})
	public hash: number;
}

export class UpdateChanDto
{
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	public name: string;

	@IsNumber()
	@IsNotEmpty()
	@IsOptional()
	public xp: number;

	@IsNumber()
	@IsNotEmpty()
	@IsOptional()
	public elo: number;

	@IsNumber()
	@IsNotEmpty()
	@IsOptional()
	public win: number;

	@IsNumber()
	@IsNotEmpty()
	@IsOptional()
	public lose: number;

	@IsNotEmptyObject()
	@IsOptional()
	public matchHistory: i_matchHistory;

	@IsNumber()
	@IsNotEmpty()
	@IsOptional()
	public friendId: number;
}
