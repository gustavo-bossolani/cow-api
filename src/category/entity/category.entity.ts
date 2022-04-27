import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Statement } from 'src/statement/entities/statement.entity';

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
}

export { Category };
