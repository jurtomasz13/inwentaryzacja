import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../user/dto/user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { DefaultArgs } from '@prisma/client/runtime/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const hashedPassword = await this.hashPassword(createUserDto.password);

      const userEntity = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: hashedPassword,
          name: createUserDto.name,
        },
      });

      return this.mapToDto(userEntity);
    } catch (error) {
      if (!this.prisma.isPrismaError(error)) {
        throw error;
      }

      if (error.code === 'P2002') {
        throw new ConflictException('User already exists');
      }

      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(
    query: Prisma.UserFindUniqueArgs<DefaultArgs>
  ): Promise<UserDto> {
    const userEntity = await this.prisma.user.findUnique(query);

    if (!userEntity) {
      throw new NotFoundException('User not found');
    }

    return this.mapToDto(userEntity);
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    const userEntity = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userEntity) {
      throw new NotFoundException('User not found');
    }

    return this.mapToDto(userEntity);
  }

  async findOneWithPassword(email: string): Promise<User> {
    const userEntity = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userEntity) {
      throw new NotFoundException('User not found');
    }

    return userEntity;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  mapToDto(user: User): UserDto {
    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
  }

  mapToDtos(users: User[]): UserDto[] {
    return users.map((user) => this.mapToDto(user));
  }
}
