import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Drive } from 'src/entities/drive.entity';
import { Partnership } from 'src/entities/partnership.entity';
import { Resource } from 'src/entities/resource.entity';
import { Like, Repository } from 'typeorm';
import { CreateDriveDto } from './dtos/create-drive.dto';
import { UpdateDriveDto } from './dtos/update-drive.dto';
import { CreatePartnershipDto } from './dtos/create-partnership.dto';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { UpdateResourceDto } from './dtos/update-resource.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Drive)
    private readonly driveRepository: Repository<Drive>,
  
    @InjectRepository(Partnership)
    private readonly partnershipRepository: Repository<Partnership>,
  
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
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
   
    const drive = this.driveRepository.create(createDriveDto);
  
  
    drive.organizer = { id: user.id } as any; 
  
  
    return await this.driveRepository.save(drive);
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


  // ================================
  // Partnerships Methods
  // ================================

  async getPartnerships(orgId: number) {
    const partnerships = await this.partnershipRepository.find({ where: { user: { id: orgId } } });
    if (!partnerships.length) {
      throw new NotFoundException('No partnerships found for this organization');
    }
    return partnerships;
  }

  async createPartnership(user: { id: number; name: string }, createPartnershipDto: CreatePartnershipDto) {
    const newPartnership = this.partnershipRepository.create(createPartnershipDto);
    newPartnership.user={ id: user.id } as any;
    return await this.partnershipRepository.save(newPartnership);
  }

  async updatePartnership(id: number, updatePartnershipDto: CreatePartnershipDto) {
    const partnership = await this.partnershipRepository.findOne({ where: { id } });
    if (!partnership) {
      throw new NotFoundException('Partnership not found');
    }
    Object.assign(partnership, updatePartnershipDto);
    return await this.partnershipRepository.save(partnership);
  }

  async deletePartnership(id: number) {
    const partnership = await this.partnershipRepository.findOne({ where: { id } });
    if (!partnership) {
      throw new NotFoundException('Partnership not found');
    }
    await this.partnershipRepository.remove(partnership);
    return { message: 'Partnership deleted successfully' };
  }

  // ================================
  // Resources Methods
  // ================================

  // Get all resources for the organization
  async getResources(orgId: number) {
    const resources = await this.resourceRepository.find({ where: { user: { id: orgId } } });
    if (!resources.length) {
      throw new NotFoundException('No resources found for this organization');
    }
    return resources;
  }

  // Create a new resource
  async createResource(user: { id: number; name: string; }, createResourceDto: CreateResourceDto) {
    const newResource = this.resourceRepository.create(createResourceDto);
    newResource.user={ id: user.id } as any;
    return await this.resourceRepository.save(newResource);
  }

  // Update an existing resource
  async updateResource(id: number, updateResourceDto: UpdateResourceDto) {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }
    Object.assign(resource, updateResourceDto);
    return await this.resourceRepository.save(resource);
  }

  // Delete a resource
  async deleteResource(id: number) {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }
    await this.resourceRepository.remove(resource);
    return { message: 'Resource deleted successfully' };
  }
}
