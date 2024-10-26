import { Role } from 'src/domain/entities/role.entity';
import { RoleEntity } from '../entities/role.entity';

export class RoleMapper {
  static toDomain(entity: RoleEntity): Role {
    return new Role(entity.id, entity.name);
  }

  static toEntity(domain: Role): RoleEntity {
    const roleEntity = new RoleEntity();
    roleEntity.id = domain.id;
    roleEntity.name = domain.name;
    return roleEntity;
  }
}
