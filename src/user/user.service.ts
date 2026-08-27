import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ResultDto } from '../dto/result.dto';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResultDto> {
    try {
      console.log('Creating user with data:', createUserDto);
      const passwordHash = await bcrypt.hash(createUserDto.password, 10);

      const user = this.userRepository.create({
        name: createUserDto.name,
        email: createUserDto.email,
        passwordHash,
      });
      return <ResultDto>{
        status: true,
        message: 'User created successfully',
        result: await this.userRepository.save(user),
      };
    } catch (error) {
      console.error('Error creating user:', error);
      return <ResultDto>{
        status: false,
        message: 'Error creating user',
      };
    }
  }
}
