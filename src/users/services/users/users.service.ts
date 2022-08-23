import { Injectable } from '@nestjs/common';
import { CreateUserType } from '../../utils/types';

@Injectable()
export class UsersService {
  private fakeUser = [
    { username: 'wardanaa', email: 'wardanaa@gmail.com' },
    { username: 'jali', email: 'jali@gmail.com' },
    { username: 'dani', email: 'dani@gmail.com' },
  ];

  fetchUser() {
    return this.fakeUser;
  }

  createUser(userPayload: CreateUserType) {
    this.fakeUser.push(userPayload);
    return;
  }

  fetchUserById(id: number) {
    return { id, username: 'fetch', email: 'fetch@gmail.com' };
  }
}
