import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class Auth42Dto
{
	@IsString()
	@IsNotEmpty()
	public token: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	public uid?: string;

	@IsString()
	@IsNotEmpty()
	public secret: string;
}

export class UpdateUserDto
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

	@IsNumber()
	@IsNotEmpty()
	@IsOptional()
	public friendId: number;

	@IsNumber()
	@IsNotEmpty()
	@IsOptional()
	public mutedId: number;
}

export class UpdateUsersAfterGameDto
{
	@IsString()
	@IsNotEmpty()
	public winner: string;

	@IsString()
	@IsNotEmpty()
	public loser: string;

	@IsNumber()
	@IsNotEmpty()
	public scoreWinner: number;

	@IsNumber()
	@IsNotEmpty()
	public scoreLoser: number;
}

export class ChooseUsernameDto
{
	@IsString()
	@IsNotEmpty()
	public username: string;
}
