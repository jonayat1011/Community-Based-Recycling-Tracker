import { Request } from 'express';
import { OrganizationService } from './organization.service';
import { CreateDriveDto } from './dtos/create-drive.dto';
import { UpdateDriveDto } from './dtos/update-drive.dto';
import { CreatePartnershipDto } from './dtos/create-partnership.dto';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { UpdateResourceDto } from './dtos/update-resource.dto';
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    getDrives(req: Request): Promise<import("../entities/drive.entity").Drive[]>;
    createDrive(createDriveDto: CreateDriveDto, req: Request): Promise<import("../entities/drive.entity").Drive>;
    updateDrive(id: number, updateDriveDto: UpdateDriveDto, req: Request): Promise<import("../entities/drive.entity").Drive>;
    deleteDrive(id: number, req: Request): Promise<{
        message: string;
    }>;
    getPartnerships(req: Request): Promise<import("../entities/partnership.entity").Partnership[]>;
    createPartnership(createPartnershipDto: CreatePartnershipDto, req: Request): Promise<import("../entities/partnership.entity").Partnership>;
    updatePartnership(id: number, updatePartnershipDto: CreatePartnershipDto, req: Request): Promise<import("../entities/partnership.entity").Partnership>;
    deletePartnership(id: number, req: Request): Promise<{
        message: string;
    }>;
    getResources(req: Request): Promise<import("../entities/resource.entity").Resource[]>;
    createResource(createResourceDto: CreateResourceDto, req: Request): Promise<import("../entities/resource.entity").Resource>;
    updateResource(id: number, updateResourceDto: UpdateResourceDto, req: Request): Promise<import("../entities/resource.entity").Resource>;
    deleteResource(id: number, req: Request): Promise<{
        message: string;
    }>;
}
