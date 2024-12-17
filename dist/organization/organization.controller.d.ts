import { OrganizationService } from './organization.service';
import { CreateDriveDto } from './dtos/create-drive.dto';
import { UpdateDriveDto } from './dtos/update-drive.dto';
import { CreatePartnershipDto } from './dtos/create-partnership.dto';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { UpdateResourceDto } from './dtos/update-resource.dto';
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    getDrives(orgId: number): Promise<import("../entities/drive.entity").Drive[]>;
    createDrive(createDriveDto: CreateDriveDto): Promise<import("../entities/drive.entity").Drive>;
    updateDrive(id: number, updateDriveDto: UpdateDriveDto): Promise<import("../entities/drive.entity").Drive>;
    deleteDrive(id: number): Promise<{
        message: string;
    }>;
    getPartnerships(orgId: number): Promise<import("../entities/partnership.entity").Partnership[]>;
    createPartnership(createPartnershipDto: CreatePartnershipDto): Promise<import("../entities/partnership.entity").Partnership>;
    updatePartnership(id: number, updatePartnershipDto: CreatePartnershipDto): Promise<import("../entities/partnership.entity").Partnership>;
    deletePartnership(id: number): Promise<{
        message: string;
    }>;
    getResources(orgId: number): Promise<import("../entities/resource.entity").Resource[]>;
    createResource(createResourceDto: CreateResourceDto): Promise<import("../entities/resource.entity").Resource>;
    updateResource(id: number, updateResourceDto: UpdateResourceDto): Promise<import("../entities/resource.entity").Resource>;
    deleteResource(id: number): Promise<{
        message: string;
    }>;
}
