import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { User } from 'src/domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper'; 

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findById(id: number): Promise<User | null> {
    const userEntity = await this.userRepo.findOne({ where: { id } , relations: ['role'],});
    return userEntity ? UserMapper.toDomain(userEntity) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const userEntity = await this.userRepo.findOne({ where: { username } , relations: ['role'],});
    return userEntity ? UserMapper.toDomain(userEntity) : null;
  }

  async save(user: User): Promise<User> {
    const userEntity = UserMapper.toEntity(user);
    const savedEntity = await this.userRepo.save(userEntity);
    return UserMapper.toDomain(savedEntity);
  }

  async findAll(): Promise<User[]> {
    const usersEntity = await this.userRepo.find();
    return usersEntity.map(UserMapper.toDomain);
  }
}
