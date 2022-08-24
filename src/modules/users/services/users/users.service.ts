import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPost } from 'src/typeorm/entities/Post';
import { UserProfile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import {
  CreateUserProfileType,
  CreateUserType,
  UpdateUserType,
  CreateUserPostType,
} from '../../utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserProfile) private profileRepo: Repository<UserProfile>,
    @InjectRepository(UserPost) private postRepo: Repository<UserPost>,
  ) {}

  fetchUser() {
    return this.userRepo.find({ relations: ['profile', 'posts'] });
  }

  createUser(userPayload: CreateUserType) {
    const newUser = this.userRepo.create(userPayload);
    return this.userRepo.save(newUser);
  }

  fetchUserById(id: number) {
    return { id, username: 'fetch', email: 'fetch@gmail.com' };
  }

  updateUser(id: number, userPayload: UpdateUserType) {
    return this.userRepo.update({ id }, { ...userPayload });
  }

  deleteUser(id: number) {
    return this.userRepo.delete({ id });
  }

  async userProfile(id: number, profilePayload: CreateUserProfileType) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const newProfile = this.profileRepo.create(profilePayload);
    const saveProfile = await this.profileRepo.save(newProfile);
    user.profile = saveProfile;

    return this.userRepo.save(user);
  }

  async userPost(id: number, postPayload: CreateUserPostType) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const newPost = this.postRepo.create({ ...postPayload, user });
    return this.postRepo.save(newPost);
  }
}
