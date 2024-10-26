// src/infrastructure/mappers/user.mapper.ts
import { User } from 'src/domain/entities/user.entity';
import { UserEntity } from '../entities/user.entity';
import { RoleMapper } from './role.mapper';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.username,
      entity.password,
      entity.isPasswordEncrypted,
      RoleMapper.toDomain(entity.role),
      entity.createdAt,
      entity.updatedAt,
      entity.createdBy ? this.toDomain(entity.createdBy) : undefined,
      entity.updatedBy ? this.toDomain(entity.updatedBy) : undefined,
    );
  }

  static toEntity(domain: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = domain.id;
    userEntity.username = domain.username;
    userEntity.password = domain.password;
    userEntity.role = RoleMapper.toEntity(domain.role);
    userEntity.createdAt = domain.createdAt;
    userEntity.updatedAt = domain.updatedAt;
    userEntity.createdBy = domain.createdBy ? this.toEntity(domain.createdBy) : undefined;
    userEntity.updatedBy = domain.updatedBy ? this.toEntity(domain.updatedBy) : undefined;
    return userEntity;
  }
}
