import { Entity, ObjectIdColumn, Column, Index } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('expenses')
export class Expense {
  @ObjectIdColumn()
  _id: ObjectId;

  @Index() @Column()
  userId: string;

  @Index() @Column()
  categoryId: string;

  @Index() @Column()
  amount: number;

  @Column({ default: 'BDT' })
  currency: string;

  @Index() @Column()
  date: Date;

  @Index() @Column({ nullable: true })
  tags?: string[];

  @Column({ nullable: true })
  note?: string;

  @Column({ default: () => new Date() })
  createdAt: Date;

  @Column({ default: () => new Date() })
  updatedAt: Date;
}
