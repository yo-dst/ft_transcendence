import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	email: string;

	@Column({ unique: true })
  username: string;

	@Column({ nullable: true })
	twoFactorAuthenticationSecret: string;

	@Column({ default: false })
	isTwoFactorAuthenticationEnabled: boolean;
}

export default User;