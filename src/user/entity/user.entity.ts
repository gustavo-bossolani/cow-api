import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Statement } from 'src/statement/entities/statement.entity';
import { Category } from 'src/category/entity/category.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Statement, (statement) => statement.user, {
    eager: false,
  })
  statement: Statement[];

  @ManyToOne(() => Category, (category) => category.user)
  category: Category;
}

export { User };
