import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Avatar from "./avatar.entity";
import FriendRequest from "../friend-request/entities/friend-request.entity";

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

	@OneToOne(type => Avatar, {
		eager: true,
		cascade: true
	})
	@JoinColumn()
	avatar: Avatar;

	@ManyToMany(type => User, user => user.friends)
	@JoinTable()
	friends: User[];

	@OneToMany(type => FriendRequest, friendRequest => friendRequest.creator)
	friendRequestCreated: FriendRequest[];

	@OneToMany(type => FriendRequest, friendRequest => friendRequest.receiver)
	friendRequestReceived: FriendRequest[];
}

export default User;