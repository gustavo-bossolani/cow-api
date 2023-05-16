import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm';

import { Category } from 'src/category/entity/category.entity';
import { User } from 'src/user/entity/user.entity';

@Entity()
@Check(`"installment" > 0`)
class Statement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true, default: '' })
  description: string;

  @Column()
  installment: number;

  @Column({
    type: 'date',
  })
  finishDate: string;

  @Column({
    type: 'date',
  })
  startDate: string;

  @Column({ type: 'decimal', scale: 2 })
  amount: number;

  @ManyToOne((_type) => User, (user) => user.statement, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne((_type) => Category, (category) => category.statement, {
    nullable: true,
    eager: true,
    lazy: false,
  })
  @JoinColumn({ name: 'categoryId' })
  category?: Category;
}

export { Statement };
