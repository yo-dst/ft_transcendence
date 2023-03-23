import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUsername.dto';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>
	) {}

	getAll(): Promise<User[]> {
		return this.usersRepository.find();
	}

	async getByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

	async getById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async getByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

	async create(userData: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.email = userData.email;
    newUser.username = userData.username;
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async setUsername(newUsername: string, userId: number) {
    return this.usersRepository.update(userId, {
      username: newUsername
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
}
