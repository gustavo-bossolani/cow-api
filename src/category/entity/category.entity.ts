import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Statement } from 'src/statement/entities/statement.entity';
import { User } from 'src/user/entity/user.entity';

@Entity()
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  color?: string;

  @OneToMany((_type) => Statement, (statement) => statement.user, {
    nullable: true,
  })
  statement?: Statement;

  @ManyToOne(() => User, (user) => user.category, { nullable: false })
  user: User;
}

export { Category };
