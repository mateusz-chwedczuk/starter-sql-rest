import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResultValue } from '../../../shared/types/result-value';
import { hashPassword } from '../../../shared/utils/hash-password';
import { UserEntity } from '../../database/entities/user.entity';
import { RegisterResults } from './register-results.enum';
import { RegisterRequest } from './register.request';

@Injectable()
export class RegisterService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async register(dto: RegisterRequest): Promise<ResultValue<RegisterResults>> {
    const emailTaken = await this.userRepository.findOne({ email: dto.email });
    if (emailTaken) return new ResultValue(RegisterResults.EMAIL_EXISTS);

    const newUser = this.userRepository.create({
      email: dto.email,
      passwordHash: await hashPassword(dto.password),
    });
    await this.userRepository.save(newUser);

    return new ResultValue(RegisterResults.OK);
  }
}
