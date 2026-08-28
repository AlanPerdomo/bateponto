import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { beforeEach, describe, expect, it } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './users.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
