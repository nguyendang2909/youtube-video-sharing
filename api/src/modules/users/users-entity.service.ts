import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserEntity {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async save(entity: Partial<User>) {
    return await this.userRepository.save(entity);
  }

  public async findOne(options: FindOneOptions<User>) {
    return await this.userRepository.findOne(options);
  }
}
