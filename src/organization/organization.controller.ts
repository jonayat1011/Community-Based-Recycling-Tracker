import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
    Req,
  } from '@nestjs/common';
  import { Request } from 'express'; // Import Request type
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
  
  export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}
  
    // ================================
    //            Drives 
    // ================================
    
    @Get('drives')
    @Roles('Organization')
    async getDrives( @Req() req: Request) {
      const user = req.user as { id: number; name: string }; 
      
      return this.organizationService.getDrives(user.id);
    }
  
    @Post('drives')
    @Roles('Organization')
    async createDrive(@Body() createDriveDto: CreateDriveDto, @Req() req: Request) {
      const user = req.user as { id: number; name: string }; 
      return this.organizationService.createDrive(user,createDriveDto);
    }
    
  
    @Patch('drives/:id')
    @Roles('Organization')
    async updateDrive(
      @Param('id') id: number,
      @Body() updateDriveDto: UpdateDriveDto,
      @Req() req: Request,
    ) {
      const user = req.user as { id: number; name: string };
      return this.organizationService.updateDrive(id, updateDriveDto);
    }
  
    @Delete('drives/:id')
    @Roles('Organization')
    async deleteDrive(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
      const user = req.user as { id: number; name: string };
      return this.organizationService.deleteDrive(id);
    }
  
    // ================================
    //          Partnerships 
    // ================================
  
    @Get('partnerships')
    @Roles('Organization')
    async getPartnerships( @Req() req: Request) {
      const user = req.user as { id: number; name: string };
      
      return this.organizationService.getPartnerships(user.id);
    }
  
    @Post('partnerships')
    @Roles('Organization')
    async createPartnership(@Body() createPartnershipDto: CreatePartnershipDto, @Req() req: Request) {
      const user = req.user as { id: number; name: string };
      
      return this.organizationService.createPartnership(user,createPartnershipDto);
    }
  
    @Patch('partnerships/:id')
    @Roles('Organization')
    async updatePartnership(
      @Param('id', ParseIntPipe) id: number,
      @Body() updatePartnershipDto: CreatePartnershipDto,
      @Req() req: Request,
    ) {
      const user = req.user as { id: number; name: string };
      console.log(`User Info: ID = ${user.id}, Name = ${user.name}`);
      return this.organizationService.updatePartnership(id, updatePartnershipDto);
    }

    @Patch('partnerships-status/:id')
    @Roles('Organization')
    async statusPartnership(
      @Param('id', ParseIntPipe) id: number,
      @Body() updatePartnershipDto: CreatePartnershipDto,
      @Req() req: Request,
    ) {
      const user = req.user as { id: number; name: string };
      console.log(`User Info: ID = ${user.id}, Name = ${user.name}`);
      return this.organizationService.statusPartnership(id, updatePartnershipDto);
    }
  
  
    @Delete('partnerships/:id')
    @Roles('Organization')
    async deletePartnership(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
      const user = req.user as { id: number; name: string };
      console.log(`User Info: ID = ${user.id}, Name = ${user.name}`);
      return this.organizationService.deletePartnership(id);
    }
    @Get('partners')
    @Roles('Organization')
    async findPartners(@Req() req: Request) {
      const user = req.user as { id: number; name: string };
      console.log(`User Info: ID = ${user.id}, Name = ${user.name}`);
    
      return this.organizationService.findPartners();
    }
    
    // ================================
    //         Resources 
    // ================================
  
    @Get('resources')
    @Roles('Organization')
    async getResources( @Req() req: Request) {
      const user = req.user as { id: number; name: string };
      
      return this.organizationService.getResources(user.id);
    }
  
    @Post('resources')
    @Roles('Organization')
    async createResource(@Body() createResourceDto: CreateResourceDto, @Req() req: Request) {
      const user = req.user as { id: number; name: string };
     
      return this.organizationService.createResource(user,createResourceDto);
    }
    @Patch('resources/:id')
    @Roles('Organization')
    async updateResource(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateResourceDto: UpdateResourceDto,
      @Req() req: Request,
    ) {
      const user = req.user as { id: number; name: string };
      console.log(`User Info: ID = ${user.id}, Name = ${user.name}`);
      return this.organizationService.updateResource(id, updateResourceDto);
    }
  
    @Delete('resources/:id')
    @Roles('Organization')
    async deleteResource(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
      const user = req.user as { id: number; name: string };
      console.log(`User Info: ID = ${user.id}, Name = ${user.name}`);
      return this.organizationService.deleteResource(id);
    }

    // ================================
    //          Notification 
    // ================================
    @Get('notification')
    @Roles('Organization')
    async getNotifications( @Req() req: Request) {
      const user = req.user as { id: number; name: string }; 
      
      return this.organizationService.getNotifications(user.id);
    }

    // ================================
    //          Dashboard
    // ================================

    // @Get('events')
    // @Roles('Organization')
    // async getEvent( @Req() req: Request) {
    //   const user = req.user as { id: number; name: string }; 
      
    //   return this.organizationService.getEvent(user.id);
    // }

    @Get('dashboard')
    @Roles('Organization')
    async getDashboard(@Req() req: Request) {
      const user = req.user as { id: number; name: string }; 
      return this.organizationService.getDashboard(user.id);
    }



  }
  