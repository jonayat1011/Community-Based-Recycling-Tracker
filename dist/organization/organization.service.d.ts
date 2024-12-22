import { Repository } from 'typeorm';
import { Notification } from 'src/entities/notification.entity';
import { Drive } from 'src/entities/drive.entity';
import { Partnership } from 'src/entities/partnership.entity';
import { Resource } from 'src/entities/resource.entity';
import { CreateDriveDto } from './dtos/create-drive.dto';
import { UpdateDriveDto } from './dtos/update-drive.dto';
import { CreatePartnershipDto } from './dtos/create-partnership.dto';
import { UpdatePartnershipDto } from './dtos/update-partnership.dto';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { UpdateResourceDto } from './dtos/update-resource.dto';
export declare class OrganizationService {
    private readonly driveRepository;
    private readonly partnershipRepository;
    private readonly notificationRepository;
    private readonly resourceRepository;
    constructor(driveRepository: Repository<Drive>, partnershipRepository: Repository<Partnership>, notificationRepository: Repository<Notification>, resourceRepository: Repository<Resource>);
    getDrives(orgId: number): Promise<Drive[]>;
    createDrive(user: {
        id: number;
        name: string;
    }, createDriveDto: CreateDriveDto): Promise<Drive>;
    updateDrive(id: number, updateDriveDto: UpdateDriveDto): Promise<Drive>;
    deleteDrive(id: number): Promise<{
        message: string;
    }>;
    getPartnerships(orgId: number): Promise<Partnership[]>;
    createPartnership(user: {
        id: number;
        name: string;
    }, createPartnershipDto: CreatePartnershipDto): Promise<Partnership>;
    updatePartnership(id: number, updatePartnershipDto: UpdatePartnershipDto): Promise<Partnership>;
    deletePartnership(id: number): Promise<{
        message: string;
    }>;
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
}
