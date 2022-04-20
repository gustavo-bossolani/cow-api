import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  user: User;
  category: Category;
}

export { Statement };
