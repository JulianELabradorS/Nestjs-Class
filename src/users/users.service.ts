import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { usersData } from './mockedData/users';

//Documentation: https://docs.nestjs.com/providers#services

@Injectable()
export class UsersService {
  private _users = usersData;

  async getAllUsers(limit = 0) {
    if (limit) {
      return this._users.slice(0, limit);
    }
    return this._users;
  }
  async getUserById(id: string) {
    const user = this._users.find((user) => user.id === parseInt(id));
    if (!user) {
      throw new HttpException('not found', 400);
    }
    return user;
  }

  async createUser(body: any) {
    this._users.push(body);
    return body;
  }

  async updateUserById(body: any, id) {
    const index = this._users.findIndex((user) => user.id === parseInt(id));
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    this._users[index] = { ...this._users[index], ...body };
    return body;
  }

  async deleteUserById(id) {
    this._users = this._users.filter((user) => user.id !== parseInt(id));
    return this._users;
  }
}
