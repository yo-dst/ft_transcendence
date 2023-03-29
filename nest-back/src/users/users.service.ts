import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import Avatar from './entities/avatar.entity';
import { Profile } from './entities/profile.entity';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>
	) {}

  // --- begin testing ---
	getAll() {
		return this.usersRepository.find({
      relations: {
        profile: true,
        friends: {
          profile: true
        },
        friendRequestsCreated: true,
        friendRequestsReceived: true
      }
    });
	}

  async remove(id: number) {
    const user = await this.getById(id);
    return this.usersRepository.remove(user);
  }
  // --- end testing ---
  
  async getBy(options: FindOneOptions<User>) {
    return this.usersRepository.findOne({ ...options });
  }

	async getByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

	async getById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async getByUsername(username: string) {
    return this.usersRepository.findOne({
      where: {
        profile: { username }
      }
    });
  }

	async create(userData: CreateUserDto) {
    const newAvatar = new Avatar();
    newAvatar.url = userData.avatarUrl;

    const newProfile = new Profile();
    newProfile.username = userData.username;
    newProfile.avatar = newAvatar;

    const newUser = new User();
    newUser.email = userData.email;
    newUser.profile = newProfile;
    
    return this.usersRepository.save(newUser);
  }

  async areFriends(userId1: number, userId2: number) {
    const user1 = await this.usersRepository.findOne({
      relations: { friends: true },
      where: { id: userId1 }
    });
    return user1.friends.find(friend => friend.id === userId2) ? true : false;
  }

  async makeFriends(userId1: number, userId2: number) {
    const user1 = await this.usersRepository.findOne({
      relations: { friends: true },
      where: { id: userId1 }
    });
    const user2 = await this.usersRepository.findOne({
      relations: { friends: true },
      where: { id: userId2 }
    });
    user1.friends.push(user2);
    user2.friends.push(user1);
    await this.usersRepository.save(user1);
    await this.usersRepository.save(user2);
  }

  async removeFriends(userId1: number, userId2: number) {
    const user1 = await this.usersRepository.findOne({
      relations: { friends: true },
      where: { id: userId1 }
    });
    const user2 = await this.usersRepository.findOne({
      relations: { friends: true },
      where: { id: userId2 }
    });
    user1.friends = user1.friends.filter(friend => friend.id !== user2.id);
    user2.friends = user2.friends.filter(friend => friend.id !== user1.id);
    await this.usersRepository.save(user1);
    await this.usersRepository.save(user2);
  }

  async setUsername(userId: number, newUsername: string) {
		const user = await this.usersRepository.findOne({
			relations: { profile: true },
			where: { id: userId }
		});
		user.profile.username = newUsername;
		return this.usersRepository.save(user);
	}
	
	async setAvatar(userId: number, newAvatarUrl: string) {
		const user = await this.usersRepository.findOne({
			relations: {
			profile: { avatar: true }
			},
			where: { id: userId }
		});
		user.profile.avatar.url = newAvatarUrl;
		return this.usersRepository.save(user);
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

  async getFriends(userId: number) {
    const userWithFriends = await this.usersRepository.findOne({
      relations: {
        friends: true
      },
      where: {
        id: userId
      }
    });
    return userWithFriends.friends;
  }

  async getFriendRequestsReceived(userId: number) {
    const userWithFriends = await this.usersRepository.findOne({
      relations: {
        friendRequestsReceived: true
      },
      where: {
        id: userId
      }
    });
    return userWithFriends.friendRequestsReceived;
  }
}


