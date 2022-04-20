import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Statement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  installment: number;

  @Column()
  finishDate: string;

  @Column()
  amount: number;

  @ManyToOne((_type) => User, (user) => user.statement, {
    lazy: true,
  })
  user: User;

  categoryId: string;
}

export { Statement };
