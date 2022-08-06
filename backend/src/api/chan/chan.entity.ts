import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Chan
{
	@PrimaryGeneratedColumn()
	public id!: number;

	@Column({ type: 'varchar', length: 255 })
	public name: string;

	@Column({ type: 'int', array: true, default: () => [] })
	public usersId: number[];

	@Column({ type: 'int' })
	public ownerId: number;

	@Column({ type: 'int', array: true, default: () => [] })
	public adminsId: number[];

	@Column({ type: 'varchar', length: 16 })
	public type: 'public' | 'private' | 'protected' | 'direct';

	@Column({ type: 'int', nullable: true, default: null })
	public hash?: number;

	// msg

	/*
	 * Create and Update Date Columns
	 */

	@CreateDateColumn({ type: 'timestamp' })
	public createdAt!: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	public updatedAt!: Date;
}
