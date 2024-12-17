import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drive } from 'src/entities/drive.entity';
import { Partnership } from 'src/entities/partnership.entity';
import { Resource } from 'src/entities/resource.entity';


@Module({
  imports:  [
    TypeOrmModule.forFeature([
      Drive,
      Partnership,
      Resource, 
    ]),
  ],
  providers: [OrganizationService],
  controllers: [OrganizationController]
})
export class OrganizationModule {}
