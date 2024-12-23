import { Repository } from 'typeorm';
import { Notification } from 'src/entities/notification.entity';
import { Drive } from 'src/entities/drive.entity';
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
export declare class OrganizationService {
    private readonly driveRepository;
    private readonly partnershipRepository;
    private readonly notificationRepository;
    private readonly resourceRepository;
    private readonly eventRepository;
    private readonly eventRegistrationRepository;
    private readonly contributionRepository;
    private readonly userRepository;
    constructor(driveRepository: Repository<Drive>, partnershipRepository: Repository<Partnership>, notificationRepository: Repository<Notification>, resourceRepository: Repository<Resource>, eventRepository: Repository<Event>, eventRegistrationRepository: Repository<EventRegistration>, contributionRepository: Repository<Contribution>, userRepository: Repository<User>);
    getDrives(orgId: number): Promise<Drive[]>;
    createDrive(user: {
        id: number;
        name: string;
    }, createDriveDto: CreateDriveDto): Promise<Drive>;
    updateDrive(id: number, updateDriveDto: UpdateDriveDto): Promise<Drive>;
    deleteDrive(id: number): Promise<{
        message: string;
    }>;
    handleDriveStatusUpdates(): Promise<void>;
    updateDriveStatus(): Promise<void>;
    getPartnerships(orgId: number): Promise<Partnership[]>;
    createPartnership(user: {
        id: number;
        name: string;
    }, createPartnershipDto: CreatePartnershipDto): Promise<Partnership>;
    updatePartnership(id: number, updatePartnershipDto: UpdatePartnershipDto): Promise<Partnership>;
    statusPartnership(id: number, updatePartnershipDto: UpdatePartnershipDto): Promise<Partnership | {
        message: string;
    }>;
    deletePartnership(id: number): Promise<{
        message: string;
    }>;
    findPartners(): Promise<User[]>;
    getResources(orgId: number): Promise<Resource[]>;
    createResource(user: {
        id: number;
        name: string;
    }, createResourceDto: CreateResourceDto): Promise<Resource>;
    updateResource(id: number, updateResourceDto: UpdateResourceDto): Promise<Resource>;
    deleteResource(id: number): Promise<{
        message: string;
    }>;
    getNotifications(orgId: number): Promise<Notification[]>;
    x: any;
    getDashboard(orgId: number): Promise<{
        event: number;
        drives: number;
        partnerships: number;
        resources: number;
        MaterialQuantity: number;
        registrations: number;
        notifications: number;
    }>;
}
