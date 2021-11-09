import { Injectable, NotFoundException } from '@nestjs/common';
import db from 'src/db';
import { Election } from './election.model';

@Injectable()
export class ElectionService {
  async findById(id: number): Promise<Election> {
    const [election] = await db('election').where('id', id);
    if (!election) throw new NotFoundException('Not found');
    return election;
  }
}
