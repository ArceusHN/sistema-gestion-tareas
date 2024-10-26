import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { IRoleRepository } from 'src/domain/repositories/role-repository.interface';
import { Role } from 'src/domain/entities/role.entity';
import { RoleMapper } from '../mappers/role.mapper';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
  ) {}

  async findById(id: number): Promise<Role | null> {
    const roleEntity = await this.roleRepo.findOne({ where: { id } });
    return roleEntity ? RoleMapper.toDomain(roleEntity) : null;
  }

  async findByName(name: string): Promise<Role | null> {
    const roleEntity = await this.roleRepo.findOne({ where: { name } });
    return roleEntity ? RoleMapper.toDomain(roleEntity) : null;
  }

  async findAll(): Promise<Role[]> {
    const rolesEntity = await this.roleRepo.find();
    return rolesEntity.map(RoleMapper.toDomain);
  }
}
