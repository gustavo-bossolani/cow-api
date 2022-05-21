import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Statement } from 'src/statement/entities/statement.entity';
import { Category } from 'src/category/entity/category.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  secret: string;

  @OneToMany((_type) => Statement, (statement) => statement.user, {
    eager: false,
  })
  statement: Statement[];

  @OneToMany(() => Category, (category) => category.user, { eager: false })
  category: Category[];
}

export { User };
