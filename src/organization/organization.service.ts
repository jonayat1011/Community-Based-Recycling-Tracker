import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Notification, NotificationType } from 'src/entities/notification.entity';
import { Drive, DriveStatus } from 'src/entities/drive.entity';
import { Partnership } from 'src/entities/partnership.entity';
import { Event } from 'src/entities/event.entity';
import { Resource } from 'src/entities/resource.entity';
import { CreateDriveDto } from './dtos/create-drive.dto';
import { UpdateDriveDto } from './dtos/update-drive.dto';
import { CreatePartnershipDto } from './dtos/create-partnership.dto';
import { UpdatePartnershipDto } from './dtos/update-partnership.dto';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { UpdateResourceDto } from './dtos/update-resource.dto';
import { EventRegistration } from 'src/entities/event-registration.entity';
import { Contribution } from 'src/entities/contribution.entity';
import { User } from 'src/entities/user.entity';
import { addDays, isAfter } from 'date-fns';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Drive)
    private readonly driveRepository: Repository<Drive>,

    @InjectRepository(Partnership)
    private readonly partnershipRepository: Repository<Partnership>,

    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,

    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(EventRegistration)
    private readonly eventRegistrationRepository: Repository<EventRegistration>,

    @InjectRepository(Contribution)
    private readonly contributionRepository: Repository<Contribution>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
 

  ) {}

  // ================================
  // Drives Methods
  // ================================

  async getDrives(orgId: number) {
    const drives = await this.driveRepository.find({ where: { organizer: { id: orgId } } });
    if (!drives.length) {
      throw new NotFoundException('No drives found for this organization');
    }
    return drives;
  }

  async createDrive(user: { id: number; name: string }, createDriveDto: CreateDriveDto): Promise<Drive> {
    const today = new Date();
  
    const sevenDaysAhead = addDays(today, 7);
    if (!isAfter(createDriveDto.startDate, sevenDaysAhead)) {
      throw new BadRequestException('Start date must be at least 7 days from today');
    }
  

    const twoDaysAfterStart = addDays(createDriveDto.startDate, 2);
    const fiveDaysAfterStart = addDays(createDriveDto.startDate, 5);
    if (
      !isAfter(createDriveDto.endDate, twoDaysAfterStart) ||
      isAfter(createDriveDto.endDate, fiveDaysAfterStart)
    ) {
      throw new BadRequestException(
        'End date must be more than 2 days after the start date and less than 5 days'
      );
    }
  
   
    const drive = this.driveRepository.create(createDriveDto);
    drive.organizer = { id: user.id } as any;
    const savedDrive = await this.driveRepository.save(drive);
  
    
    await this.notificationRepository.save({
      message: `New Event Request: ${createDriveDto.title}`,
      type: NotificationType.EventRequest,
      fromUser: { id: user.id } as any,
      entityId: savedDrive.id,
    });
  
    return savedDrive;
  }
  

  async updateDrive(id: number, updateDriveDto: UpdateDriveDto): Promise<Drive> {
    const drive = await this.driveRepository.findOne({ where: { id } });
    if (!drive) {
      throw new NotFoundException('Drive not found');
    }
    Object.assign(drive, updateDriveDto);
    return await this.driveRepository.save(drive);
  }

  async deleteDrive(id: number) {
    const drive = await this.driveRepository.findOne({ where: { id } });
    if (!drive) {
      throw new NotFoundException('Drive not found');
    }
    await this.driveRepository.remove(drive);
    return { message: 'Drive deleted successfully' };
  }

  @Cron('0 0 * * *') // Runs daily at midnight
  async handleDriveStatusUpdates() {
    console.log('Updating drive statuses...');
    await this.updateDriveStatus();
  }

  async updateDriveStatus() {
    const today = new Date();

   
    await this.driveRepository
      .createQueryBuilder()
      .update(Drive)
      .set({ status: DriveStatus.ONGOING })
      .where('status = :status', { status: DriveStatus.APPROVED })
      .andWhere('startDate <= :today', { today })
      .execute();

   
    await this.driveRepository
      .createQueryBuilder()
      .update(Drive)
      .set({ status: DriveStatus.COMPLETED })
      .where('status = :status', { status: DriveStatus.ONGOING })
      .andWhere('endDate <= :today', { today })
      .execute();
  }

  // ================================
  // Partnerships Methods
  // ================================

  async getPartnerships(orgId: number) {
    const partnerships = await this.partnershipRepository.find({ where: { hostUser: { id: orgId } } });
    if (!partnerships.length) {
      throw new NotFoundException('No partnerships found for this organization');
    }
    return partnerships;
  }

  async createPartnership(user: { id: number; name: string }, createPartnershipDto: CreatePartnershipDto) {
    const newPartnership = this.partnershipRepository.create(createPartnershipDto);
    newPartnership.hostUser = { id: user.id } as any;
    const savedPartnership = await this.partnershipRepository.save(newPartnership);

    await this.notificationRepository.save({
      message: `Partnership request sent to ${createPartnershipDto.partnerName}`,
      type: NotificationType.PartnershipRequest,
      fromUser: { id: user.id } as any,
      toUser: { id: newPartnership.guestUser } as any,
      entityId: savedPartnership.id,
    });

    return savedPartnership;
  }

  async updatePartnership(id: number, updatePartnershipDto: UpdatePartnershipDto) {
    const partnership = await this.partnershipRepository.findOne({ where: { id } });
    if (!partnership) {
      throw new NotFoundException('Partnership not found');
    }
    Object.assign(partnership, updatePartnershipDto);
    return await this.partnershipRepository.save(partnership);
  }

  async statusPartnership(id: number, updatePartnershipDto: UpdatePartnershipDto) {
    const partnership = await this.partnershipRepository.findOne({ where: { id } });
    if (!partnership) {
      throw new NotFoundException('Partnership not found');
    }
    if(partnership.guestUser.id == id) {
      Object.assign(partnership, updatePartnershipDto);
      return await this.partnershipRepository.save(partnership);
    }
    return { message: 'Partnership is not for You' };
  }



  async deletePartnership(id: number) {
    const partnership = await this.partnershipRepository.findOne({ where: { id } });
    if (!partnership) {
      throw new NotFoundException('Partnership not found');
    }
    await this.partnershipRepository.remove(partnership);
    return { message: 'Partnership deleted successfully' };
  }

  async findPartners() {
    // Use the repository to find all users with the role 'Organization'
    return this.userRepository.find({
      where: { role: 'Organization' },
      select: ['id', 'name', 'email'], // Return only necessary fields
    });
  }
  
  // ================================
  // Resources Methods
  // ================================

  async getResources(orgId: number) {
    const resources = await this.resourceRepository.find({ where: { user: { id: orgId } } });
    if (!resources.length) {
      throw new NotFoundException('No resources found for this organization');
    }
    return resources;
  }

  async createResource(user: { id: number; name: string }, createResourceDto: CreateResourceDto) {
    const newResource = this.resourceRepository.create(createResourceDto);
    newResource.user = { id: user.id } as any;
    const savedResource = await this.resourceRepository.save(newResource);

    return savedResource;
  }

  async updateResource(id: number, updateResourceDto: UpdateResourceDto) {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }
    Object.assign(resource, updateResourceDto);
    return await this.resourceRepository.save(resource);
  }

  async deleteResource(id: number) {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }
    await this.resourceRepository.remove(resource);
    return { message: 'Resource deleted successfully' };
  }

  // ================================
  // Notification Methods
  // ================================
  async getNotifications(orgId: number) {
    const notifications = await this.notificationRepository.find({
      where: [
        {
          type: In([ NotificationType.NewEvent]),
        },
        {
          type: In([NotificationType.EventRequest]),
          fromUser: { id: orgId },
        },
        {
          type: In([NotificationType.PartnershipRequest]),
          fromUser: { id: orgId },
        },
        {
          type: In([NotificationType.PartnershipRequest]),
          toUser: { id: orgId },
        },
      ],
    });
  
    if (!notifications.length) {
      throw new NotFoundException('No notifications found for this organization');
    }
    return notifications;
  }

// ================================
//          Dashboard Methods
// ================================
x
async getDashboard(orgId: number) {
  const eventCount = await this.eventRepository.count({ 
  where: [
      {
        organizer: { id: orgId } 
      },
      {
        partnership: { hostUser: { id: orgId } }
      },
      {
        partnership: { guestUser: { id: orgId } }
      },
    ],
  });
  const driveCount = await this.driveRepository.count({ where: { organizer: { id: orgId } } });

  const partnershipCount = await this.partnershipRepository.count({ where: { hostUser: { id: orgId } } });

  const resourceCount = await this.resourceRepository.count({ where: { user: { id: orgId } } });

  const registrationCount = await this.eventRegistrationRepository.count({
    where:[ 
    {
      event: {
        organizer: {
          id: orgId,
        },
      },
    },
    {
      event: {
        partnership: { hostUser: { id: orgId } }
      },
    },
    {
      event: {
        partnership: { guestUser: { id: orgId } }
      },
    },
  ],
  });

  // const uniqueRegistrationCount = await this.eventRegistrationRepository
  // .createQueryBuilder('eventRegistration')
  // .leftJoinAndSelect('eventRegistration.event', 'event')  // Join the 'event' table
  // .leftJoinAndSelect('eventRegistration.user', 'user')  // Join the 'user' table
  // .where('event.organizerId = :orgId', { orgId })  // Reference the 'event' table
  // .orWhere('event.partnershipHostUserId = :orgId', { orgId })  // Ensure the correct column name
  // .orWhere('event.partnershipGuestUserId = :orgId', { orgId })  // Ensure the correct column name
  // .groupBy('user.id')  // Group by user ID to ensure uniqueness
  // .getCount();  // Get the count of unique users


  const notificationCount = await this.notificationRepository.count({
    where: [
      { type: NotificationType.NewEvent, fromUser: { id: orgId } },
      { type: NotificationType.EventRequest, fromUser: { id: orgId } },
      { type: NotificationType.PartnershipRequest, fromUser: { id: orgId } },
      { type: NotificationType.PartnershipRequest, toUser: { id: orgId } },
    ],
  });
  const contributions = await this.contributionRepository.find({
    where: [
      {
        event: {
          organizer: {
            id: orgId,
          },
        },
      },
      {
        event: {
          partnership: { hostUser: { id: orgId } }
        },
      },
      {
        event: {
          partnership: { guestUser: { id: orgId } }
        },
      },
    ],
  });

  const totalMaterialQuantity = contributions.reduce(
    (total, contribution) => total + contribution.quantity,
    0,
  );

  return {
    event: eventCount,
    drives: driveCount,
    partnerships: partnershipCount,
    resources: resourceCount,
    MaterialQuantity: totalMaterialQuantity,
    // registrations: uniqueRegistrationCount,
    registrations: registrationCount,
    notifications: notificationCount,
  };
}

}
