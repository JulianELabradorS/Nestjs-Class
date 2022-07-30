import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { usersData } from './mockedData/users';

//Documentation: https://docs.nestjs.com/providers#services

@Injectable()
export class UsersService {
  private _users = usersData;
  constructor(
    // inyeccion de repositorio para poder usar los metodos de la entidad
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
  ) {}

  async getAllUsers(limit = 0) {
    return await this._userRepository.find();
  }
  async getUserById(id: string) {
    const user = this._users.find((user) => user.id === parseInt(id));

    if (!user) {
      throw new HttpException('not found', 400);
    }
    return user;
  }

  async createUser(body) {
    const user = await this._userRepository.create(body);
    await this._userRepository.save(user);
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
