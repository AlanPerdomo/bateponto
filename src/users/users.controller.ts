import { Controller, Post, Body, HttpStatus, Res, Get } from '@nestjs/common';
import type { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResultDto } from '../dto/result.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('cadastrar')
  async createUser(
    @Body() data: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const result: ResultDto = await this.userService.create(data);
    if (result.status) {
      res.status(HttpStatus.CREATED).json(result);
    } else {
      res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
  }

  @Post('test')
  async testEndpoint(@Body() data: any, @Res() res: Response): Promise<void> {
    const result = await this.userService.findByEmail(data.email);

    if (result) {
      res
        .status(HttpStatus.OK)
        .json({ status: true, message: 'User found', result });
    } else {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: false, message: 'User not found' });
    }
  }
}
