import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Expense } from './expense.entity/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(@InjectRepository(Expense) private repo: MongoRepository<Expense>) {}

  list(userId: string, q: any) {
    const where: any = { userId };
    if (q.categoryId) where.categoryId = q.categoryId;
    if (q.minAmount) where.amount = { ...(where.amount || {}), $gte: +q.minAmount };
    if (q.maxAmount) where.amount = { ...(where.amount || {}), $lte: +q.maxAmount };
    if (q.startDate || q.endDate) {
      where.date = {};
      if (q.startDate) where.date.$gte = new Date(q.startDate);
      if (q.endDate) where.date.$lte = new Date(q.endDate);
    }
    if (q.tag) where.tags = { $in: [q.tag] };
    const take = Math.min(+q.limit || 20, 100);
    const skip = Math.max((+q.page || 1) - 1, 0) * take;
    const order = { [q.sortBy || 'date']: (q.sortDir || 'desc') === 'desc' ? -1 : 1 };
    return this.repo.find({ where, take, skip, order: order as any });
  }
  create(userId: string, data: Partial<Expense>) {
    const now = new Date();
    return this.repo.save(this.repo.create({ ...data, userId, createdAt: now, updatedAt: now, date: new Date(data.date!) }));
  }
  get(userId: string, id: string) {
    return this.repo.findOne({ where: { _id: id as any, userId } });
  }
  update(userId: string, id: string, data: Partial<Expense>) {
    if (data.date) (data as any).date = new Date(data.date as any);
    (data as any).updatedAt = new Date();
    return this.repo.update({ _id: id as any, userId } as any, data);
  }
  remove(userId: string, id: string) {
    return this.repo.delete({ _id: id as any, userId } as any);
  }
}