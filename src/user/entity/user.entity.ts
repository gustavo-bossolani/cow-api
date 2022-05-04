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

  @OneToMany(() => Category, (category) => category.user, { eager: false })
  category: Category[];
}

export { User };
