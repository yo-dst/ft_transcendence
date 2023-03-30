import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Match {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	scoreWinner: number;

	@Column()
	scoreLoser: number;

	@Column()
	winner: string;

	@Column()
	loser: string;

	@CreateDateColumn()
	createdAt: Date;

}