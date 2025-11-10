import { Entity, ObjectIdColumn, Column, Index } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('categories')
export class Category {
  @ObjectIdColumn()
  _id: ObjectId;

  @Index() @Column()
  userId: string;

  @Index() @Column()
  name: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ default: () => new Date() })
  createdAt: Date;
}
