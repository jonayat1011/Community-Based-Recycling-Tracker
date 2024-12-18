import { Drive } from 'src/entities/drive.entity';
import { Partnership } from 'src/entities/partnership.entity';
import { Resource } from 'src/entities/resource.entity';
import { Repository } from 'typeorm';
import { CreateDriveDto } from './dtos/create-drive.dto';
import { UpdateDriveDto } from './dtos/update-drive.dto';
import { CreatePartnershipDto } from './dtos/create-partnership.dto';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { UpdateResourceDto } from './dtos/update-resource.dto';
export declare class OrganizationService {
    private readonly driveRepository;
    private readonly partnershipRepository;
    private readonly resourceRepository;
    constructor(driveRepository: Repository<Drive>, partnershipRepository: Repository<Partnership>, resourceRepository: Repository<Resource>);
    getDrives(orgId: number): Promise<Drive[]>;
    createDrive(createDriveDto: CreateDriveDto): Promise<Drive>;
    updateDrive(id: number, updateDriveDto: UpdateDriveDto): Promise<Drive>;
    deleteDrive(id: number): Promise<{
        message: string;
    }>;
    getPartnerships(orgId: number): Promise<Partnership[]>;
    createPartnership(createPartnershipDto: CreatePartnershipDto): Promise<Partnership>;
    updatePartnership(id: number, updatePartnershipDto: CreatePartnershipDto): Promise<Partnership>;
    deletePartnership(id: number): Promise<{
        message: string;
    }>;
    getResources(orgId: number): Promise<Resource[]>;
    createResource(createResourceDto: CreateResourceDto): Promise<Resource>;
    updateResource(id: number, updateResourceDto: UpdateResourceDto): Promise<Resource>;
    deleteResource(id: number): Promise<{
        message: string;
    }>;
}
