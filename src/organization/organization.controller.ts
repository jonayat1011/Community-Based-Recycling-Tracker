import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateDriveDto } from './dtos/create-drive.dto';
import { UpdateDriveDto } from './dtos/update-drive.dto';
import { CreatePartnershipDto } from './dtos/create-partnership.dto';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { UpdateResourceDto } from './dtos/update-resource.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';



@Controller('organization')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles('Organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  // ================================
  // Drives Endpoints
  // ================================

  @Get('drives/:orgId')
  
  async getDrives(@Param('orgId', ParseIntPipe) orgId: number) {
    return this.organizationService.getDrives(orgId);
  }

  @Post('drives')
  async createDrive(@Body() createDriveDto: CreateDriveDto) {
    return this.organizationService.createDrive(createDriveDto);
  }

  @Patch('drives/:id')
  async updateDrive(
    @Param('id') id: number,
    @Body() updateDriveDto: UpdateDriveDto,
  ) {
    return await this.organizationService.updateDrive(id, updateDriveDto);
  }

  @Delete('drives/:id')
  async deleteDrive(@Param('id', ParseIntPipe) id: number) {
    return this.organizationService.deleteDrive(id);
  }



  // ================================
  // Partnerships Endpoints
  // ================================

  @Get('partnerships/:orgId')
  async getPartnerships(@Param('orgId', ParseIntPipe) orgId: number) {
    return this.organizationService.getPartnerships(orgId);
  }

  @Post('partnerships')
  async createPartnership(@Body() createPartnershipDto: CreatePartnershipDto) {
    return this.organizationService.createPartnership(createPartnershipDto);
  }

  @Patch('partnerships/:id')
  async updatePartnership(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePartnershipDto: CreatePartnershipDto,
  ) {
    return this.organizationService.updatePartnership(id, updatePartnershipDto);
  }

  @Delete('partnerships/:id')
  async deletePartnership(@Param('id', ParseIntPipe) id: number) {
    return this.organizationService.deletePartnership(id);
  }

  // ================================
  // Resources Endpoints
  // ================================

  @Get('resources/:orgId')
  async getResources(@Param('orgId', ParseIntPipe) orgId: number) {
    return this.organizationService.getResources(orgId);
  }

  
  @Post('resources')
  async createResource(@Body() createResourceDto: CreateResourceDto) {
    return this.organizationService.createResource(createResourceDto);
  }

  
  @Patch('resources/:id')
  async updateResource(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.organizationService.updateResource(id, updateResourceDto);
  }


  @Delete('resources/:id')
  async deleteResource(@Param('id', ParseIntPipe) id: number) {
    return this.organizationService.deleteResource(id);
  }
}
