import { Board } from "./Board";
import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Task } from "./Task";

@ObjectType()
@Entity()
export class TaskList extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  boardId: number;

  @ManyToOne(() => Board, (board) => board.taskLists, { onDelete: "CASCADE" })
  board: Board;

  @Field(() => [Task])
  @OneToMany(() => Task, (task) => task.taskList)
  tasks: Task[];

  @Field()
  @Column({ type: "double precision", default: 65535.5 })
  minPos: number;

  @Field()
  @Column({ type: "double precision", default: 65535.5 })
  maxPos: number;

  @Field()
  @Column({ type: "double precision", default: 65535.5 })
  pos: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
