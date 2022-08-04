import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { i_matchHistory } from 'src/interface/matchHistory.interface';

@Entity()
export class User
{
	@PrimaryGeneratedColumn()
	public id!: number;

	@Column({ type: 'varchar', length: 120 })
	public access_token: string;

	@Column({ type: 'varchar', length: 255 })
	public username: string;

	@Column({ type: 'int', default: 0 })
	public xp: number;

	@Column({ type: 'int', default: 1000 })
	public elo: number;

	@Column({ type: 'int', default: 0 })
	public win: number;

	@Column({ type: 'int', default: 0 })
	public lose: number;

	@Column({ type: 'jsonb', nullable: true })
	public matchHistory?: i_matchHistory[];

	@Column({ type: 'int', nullable: true })
	public friendsId?: number[];

	@Column({ type: 'boolean', default: false })
	public isDeleted: boolean;

	/*
	 * Create and Update Date Columns
	 */

	@CreateDateColumn({ type: 'timestamp' })
	public createdAt!: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	public updatedAt!: Date;
}
