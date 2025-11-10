import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Category } from './category.entity/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: MongoRepository<Category>) {}

  list(userId: string) { return this.repo.find({ where: { userId } }); }
  create(userId: string, data: Partial<Category>) {
    return this.repo.save(this.repo.create({ ...data, userId }));
  }
  get(userId: string, id: string) {
    return this.repo.findOne({ where: { _id: id as any, userId } });
  }
  update(userId: string, id: string, data: Partial<Category>) {
    return this.repo.update({ _id: id as any, userId } as any, { ...data });
  }
  remove(userId: string, id: string) {
    return this.repo.delete({ _id: id as any, userId } as any);
  }
}