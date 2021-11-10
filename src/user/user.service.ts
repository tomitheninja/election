import { ConflictException, Injectable } from '@nestjs/common';
import db from '../db';
import { User, UserWithCreds } from './user.model';
import { CreateUserInput } from './user.dto';
import { hash } from 'bcrypt';
import { PaginationInput } from 'src/pagination.dto';

@Injectable()
export class UserService {
  async create(user: CreateUserInput): Promise<User> {
    try {
      const [id] = await db('user').insert({
        ...user,
        password: await hash(user.password, 10),
      });
      return this.findById(id);
    } catch (err) {
      if (err.errno === 19)
        throw new ConflictException('Email already registrated');
      throw err;
    }
  }

  async findByEmail(email: string): Promise<UserWithCreds | null> {
    return db('user').where('email', email).first();
  }

  async findById(id: number): Promise<UserWithCreds | null> {
    return db('user').where('id', id).first();
  }

  async listAll({ offset, limit }: PaginationInput): Promise<User[]> {
    return db('user').offset(offset).limit(limit);
  }
}
