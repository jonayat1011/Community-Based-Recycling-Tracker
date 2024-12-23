import { Module } from '@nestjs/common';
import { RecyclerController } from './recycler.controller';
import { RecyclerService } from './recycler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recycler } from './entities/recycler/recycler.entity';
import { MaterialLog } from './entities/recycler/material.entity';
import { Event } from './entities/recycler/event.entity';
import { RecyclerEvent } from './entities/recycler/event_recycler.entity';
import { User } from './entities/recycler/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recycler, MaterialLog, Event, RecyclerEvent, User])],
  controllers: [RecyclerController],
  providers: [RecyclerService],
  exports: [RecyclerService],
})
export class RecyclerModule {}
