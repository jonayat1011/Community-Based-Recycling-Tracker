/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Drive } from './entities/drive.entity';
import { Reward } from './entities/reward.entity';
import { Resource } from './entities/resource.entity';
import { RecyclingCenter } from './entities/recycling-center.entity';
import { Partnership } from './entities/partnership.entity';
import { Event } from './entities/event.entity';
import { Contribution } from './entities/contribution.entity';
import { Challenge } from './entities/challenge.entity';
import { ChallengeParticipation } from './entities/challenge-participation.entity';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '@1545',
    database: 'community_recycling',
    entities: [User,Drive,Reward,Resource,RecyclingCenter,Partnership,Event,Contribution,Challenge,ChallengeParticipation],
    synchronize: true,
  }),
    OrganizationModule],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}
