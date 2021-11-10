import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import db from 'src/db';
import { Election } from './election.model';
import { CreateElectionInput, FindAllElectionInput } from './election.dto';
import { User } from '../user/user.model';

@Injectable()
export class ElectionService {
  async create(data: CreateElectionInput, organizer: User['id']) {
    try {
      const [id] = await db('election').insert({
        ...data,
        organizer_id: organizer,
      });
      return this.findById(id);
    } catch (err) {
      if (err.errno === 1062)
        throw new ConflictException('This election name is already taken');
      throw err;
    }
  }

  async findById(id: Election['id']): Promise<Election> {
    const [election] = await db('election').where('id', id);
    if (!election) throw new NotFoundException('Not found');
    return election;
  }

  async findAll({
    limit,
    offset,
    organizerId,
  }: FindAllElectionInput): Promise<Election[]> {
    const table = db('election');
    const rows =
      organizerId != null ? table.where('organizer_id', organizerId) : table;
    return rows.limit(limit).offset(offset);
  }
}
