import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Statement } from 'src/statement/entities/statement.entity';

@Entity()
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany((_type) => Statement, (statement) => statement.user)
  statement?: Statement;
}

export { Category };
