import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { TaskList } from "./TaskList";

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  listId: number;

  @ManyToOne(() => TaskList, (taskList) => taskList.tasks, {
    onDelete: "CASCADE",
  })
  taskList: TaskList;

  @Field()
  @Column({ type: "double precision", default: 65535.5 })
  pos: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
