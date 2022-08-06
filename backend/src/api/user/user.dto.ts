import { IsNotEmpty, IsOptional, IsString, IsNumber, IsNotEmptyObject } from 'class-validator';
import { i_matchHistory } from 'src/interface/matchHistory.interface';

export class CreateUserDto {
	@IsString()
	public access_token: string;
}

export class UpdateUserDto {
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
