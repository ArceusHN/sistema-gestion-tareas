import { Role } from '../entities/role.entity';

export interface IRoleRepository {
  findById(id: number): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  findAll(): Promise<Role[]>;
}

export const ROLE_REPOSITORY = Symbol('IRoleRepository');

