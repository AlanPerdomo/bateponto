import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import type { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResultDto } from '../dto/result.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
