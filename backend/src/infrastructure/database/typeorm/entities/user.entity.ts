import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { RoleEntity } from './role.entity';
import { TaskEntity } from './task.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'is_password_encrypted' })
  isPasswordEncrypted: boolean;

  @ManyToOne(() => RoleEntity, (role) => role.users, { eager: false })
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedBy: UserEntity;
}
