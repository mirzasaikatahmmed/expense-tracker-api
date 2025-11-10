import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: MongoRepository<User>) {}

  create(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }
  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
  me(userId: string) {
    return this.repo.findOne({ where: { _id: userId as any } });
  }
}
