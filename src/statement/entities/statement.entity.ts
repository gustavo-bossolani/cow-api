import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
  amount: number;

  @ManyToOne((_type) => User, (user) => user.statement, { nullable: false })
  user: User;

  @ManyToOne((_type) => Category, (category) => category.statement, {
    nullable: true,
    eager: true,
  })
  category?: Category;
}

export { Statement };
