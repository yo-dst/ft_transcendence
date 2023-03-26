import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import FriendRequest from './friend-request/entities/friend-request.entity';
import Avatar from './entities/avatar.entity';
import { FriendRequestController } from './friend-request/friend-request.controller';
import { FriendRequestsService } from './friend-request/friend-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, FriendRequest, Avatar])],
  providers: [
    UsersService,
    FriendRequestsService
  ],
  exports: [UsersService],
  controllers: [
    UsersController,
    FriendRequestController
  ]
})
export class UsersModule {}
