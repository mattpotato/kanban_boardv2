import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TaskList } from "./TaskList";
import { User } from "./User";

@ObjectType()
@Entity()
export class Board extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.boards)
  creator: User;

  @Field(() => TaskList)
  @OneToMany(() => TaskList, (taskList) => taskList.board)
  taskLists: User;

  @Field()
  @Column({ type: "double precision", default: 65535.5 })
  minPos: number;

  @Field()
  @Column({ type: "double precision", default: 65535.5 })
  maxPos: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @CreateDateColumn()
  updatedAt: Date;
}
