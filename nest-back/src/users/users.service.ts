import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import Avatar from './entities/avatar.entity';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>
	) {}

	getAll(): Promise<User[]> {
		return this.usersRepository.find({
      relations: ["friends", "friendRequestCreated", "friendRequestReceived"]
    });
	}

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

	async getByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

	async getById(id: number, relations?: string[]): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: relations
    });
  }

  async getByUsername(username: string, relations?: string[]): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
      relations: relations
    });
  }

	async create(userData: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.email = userData.email;
    newUser.username = userData.username;
    const newAvatar = new Avatar();
    newAvatar.url = userData.avatarUrl;
    newUser.avatar = newAvatar;
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async setUsername(newUsername: string, userId: number) {
    return this.usersRepository.update(userId, {
      username: newUsername
    });
  }

  async setAvatar(newAvatarUrl: string, userId: number) {
    const newAvatar = new Avatar();
    newAvatar.url = newAvatarUrl;
    return this.usersRepository.update(userId, {
      avatar: newAvatar
    });
  }

  async setTwoFactorAuthenticationSecret(secret: string | null, userId: number) {
    return this.usersRepository.update(userId, {
      twoFactorAuthenticationSecret: secret
    });
  }

  async turnOnTwoFactorAuthentication(userId: number) {
    return this.usersRepository.update(userId, {
      isTwoFactorAuthenticationEnabled: true
    });
  }

  async turnOffTwoFactorAuthentication(userId: number) {
    await this.setTwoFactorAuthenticationSecret(null, userId);
    return this.usersRepository.update(userId, {
      isTwoFactorAuthenticationEnabled: false
    });
  }

  async addFriend(user: User, newFriend: User) {
    user.friends.push(newFriend);
    await this.usersRepository.save(user);
    newFriend.friends.push(user);
    await this.usersRepository.save(newFriend);
  }

  async removeFriend(user: User, friendToRemove: User) {
    user.friends = user.friends.filter(friend => friend.username !== friendToRemove.username);
    await this.usersRepository.save(user);
    friendToRemove.friends = friendToRemove.friends.filter(friend => friend.username !== user.username);
    await this.usersRepository.save(friendToRemove);
  }
}
