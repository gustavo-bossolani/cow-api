import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Statement } from 'src/statement/entities/statement.entity';
import { User } from 'src/user/entity/user.entity';

@Entity()
class Category {
  @ApiProperty({ example: 'fa817897-ec03-4cb3-abb2-b02aba60cc0e' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Hardware' })
  @Column()
  name: string;

  @ApiProperty({ example: '#FFFF' })
  @Column({ nullable: true, default: '' })
  color?: string;

  @OneToMany((_type) => Statement, (statement) => statement.user, {
    nullable: true,
  })
  statement?: Statement;

  @ManyToOne(() => User, (user) => user.category, { nullable: false })
  user: User;
}

export { Category };
