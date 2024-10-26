import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity('task_statuses')
export class TaskStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => TaskEntity, (task) => task.status)
  tasks: TaskEntity[];
}
