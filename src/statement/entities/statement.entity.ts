import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Category } from 'src/category/entity/category.entity';
import { User } from 'src/user/entity/user.entity';

@Entity()
class Statement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column()
  installment: number;

  @Column()
  finishDate: string;

  @Column()
  startDate: string;

  @CreateDateColumn({ type: 'date' })
  createdAt: string;

  @Column({ type: 'decimal', scale: 2 })
  amount: number;

  @ManyToOne((_type) => User, (user) => user.statement, { nullable: false })
  user: User;

  @ManyToOne((_type) => Category, (category) => category.statement, {
    nullable: true,
  })
  category?: Category;
}

export { Statement };
