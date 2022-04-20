import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Statement } from 'src/statement/entities/statement.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Statement, (statement) => statement.user, {
    lazy: true,
  })
  statement: Statement[];
}

export { User };
