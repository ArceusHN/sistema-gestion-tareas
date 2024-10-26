import { User } from '../entities/user.entity';

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  save(user: User): Promise<User>;
  findAll(): Promise<User[]>;
}

export const USER_REPOSITORY = Symbol('IUserRepository');