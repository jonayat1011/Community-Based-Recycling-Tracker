import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drive } from 'src/entities/drive.entity';
import { Partnership } from 'src/entities/partnership.entity';
import { Resource } from 'src/entities/resource.entity';
import { Notification} from 'src/entities/notification.entity';
import { Event } from 'src/entities/event.entity';
import { EventRegistration } from 'src/entities/event-registration.entity';
import { Contribution } from 'src/entities/contribution.entity';
import { User } from 'src/entities/user.entity';


@Module({
  imports:  [
    TypeOrmModule.forFeature([
      Drive,
      Partnership,
      Resource,
      Notification,
      Event,
      EventRegistration,
      Contribution,
      User
    ]),
  ],
  providers: [OrganizationService],
  controllers: [OrganizationController]
})
export class OrganizationModule {}
