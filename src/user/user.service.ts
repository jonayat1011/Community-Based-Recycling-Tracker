import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recycler } from 'src/recycler/entities/recycler/recycler.entity';
import { Repository } from 'typeorm/repository/Repository';
@Injectable()
export class UserService {
    recyclerRepository: any;
    constructor(
    ) {}
    findOneByEmail(email: string) {
        throw new Error('Method not implemented.');
    }
    async findById(id: number): Promise<Recycler | null> {
        return this.recyclerRepository.findOne({ where: { id } }) || null;
      }
}
