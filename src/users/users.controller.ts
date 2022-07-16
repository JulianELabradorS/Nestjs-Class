import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

/* Note: the decorators @ApiTags,@ApiOperation,@ApiBody are not necessary for the drivers, they were included for the documentation hosted in /api, in which you can test the functionality of the user module. */
// Documentation : https://docs.nestjs.com/controllers
@Controller('users')
@ApiTags('User Enpoints')
export class UsersController {
  constructor(private usersService: UsersService) {}
  //GET
  @ApiOperation({ description: 'get all users' })
  @Get('')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  //GET
  @ApiOperation({ description: 'get a specific user number by query param' })
  @Get('getUsersWithLimit')
  getUsersByQueryParam(@Query('limit') limit: string) {
    const parsedLimit = parseInt(limit);
    return this.usersService.getAllUsers(parsedLimit);
  }

  //GET
  @ApiOperation({ description: 'get specific user by id sent in url param' })
  @Get('find/:id')
  async getUsers(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  //POST
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string' },
        gender: { type: 'string' },
      },
    },
  })
  @Post('')
  async createUser(@Body() body) {
    return this.usersService.createUser(body);
  }

  //PATCH
  @ApiOperation({ description: 'update specific user by id sent in url param' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string' },
        gender: { type: 'string' },
      },
    },
  })
  @Patch(':id')
  async updateUser(@Body() body: any, @Param('id') id: string) {
    return this.usersService.updateUserById(body, id);
  }

  //Delete
  @ApiOperation({ description: 'delete specific user by id sent in url param' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
