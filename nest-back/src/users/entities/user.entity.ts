import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Avatar from "./avatar.entity";
import FriendRequest from "../friend-requests/entities/friend-request.entity";
import { Profile } from "./profile.entity";
import { Match } from "./match.entity";

@Entity()
class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	email: string;

	@Column({ nullable: true, default: null })
	twoFactorAuthenticationSecret: string;

	@Column({ default: false })
	isTwoFactorAuthenticationEnabled: boolean;

	@OneToOne(type => Profile, {
		cascade: true
	})
	@JoinColumn()
	profile: Profile;

	@ManyToMany(type => User, user => user.friends)
	@JoinTable()
	friends: User[];

	@OneToMany(type => FriendRequest, friendRequest => friendRequest.creator)
	friendRequestsCreated: FriendRequest[];

	@OneToMany(type => FriendRequest, friendRequest => friendRequest.receiver)
	friendRequestsReceived: FriendRequest[];

}

export default User;