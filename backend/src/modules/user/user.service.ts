import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async getOneById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ id });
  }

  async getOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ email });
  }

  async getManyAndCount(pageSize: number, pageNumber: number): Promise<[UserEntity[], number]> {
    return this.userRepository.findAndCount({ skip: pageSize * pageNumber, take: pageSize });
  }
}
