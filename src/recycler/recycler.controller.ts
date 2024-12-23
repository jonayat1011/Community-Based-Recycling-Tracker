import {Request , Controller, Post, Body, Param, Get, NotFoundException, InternalServerErrorException, BadRequestException, UseGuards, Query } from '@nestjs/common';
import { RecyclerService } from './recycler.service';
import { MaterialLog } from './entities/recycler/material.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
@Controller('recycler')
export class RecyclerController {
  eventService: any;
  recyclerEventService: any;

  constructor(private readonly recyclerService: RecyclerService,) {}  // Protect route with JWT guard
  @Get('profile/:id')
  @UseGuards(JwtAuthGuard,RoleGuard)
  getProfile(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.recyclerService.getProfile(userId);
  }

  @Post('update-password/:id')
  async updatePassword(
    @Param('id') id: number,
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    const { oldPassword, newPassword } = body;
    return this.recyclerService.updatePassword(id, newPassword, oldPassword);
  }

  @Post('/add-earnings/:id')
  async addEarnings(@Param('id') recyclerId: number, @Body() data) {
    return this.recyclerService.addEarnings(recyclerId, data.earnings);
  }


  @Get('/earnings-today-yesterday/:id')
  async getTodaysAndYesterdaysEarnings(@Param('id') recyclerId: number) {
    return this.recyclerService.getTodaysAndYesterdaysEarnings(recyclerId);
  }



  @Get('/financials/:id')
  async getFinancials(@Param('id') id: number) {
      return this.recyclerService.getFinancials(id);
  }
  @Post('/progress/:id')
  async getProgress(
    @Param('id') id: string, 
    @Body() body: { from: string; to: string; groupBy?: string },
  ) {
    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) throw new BadRequestException('Invalid ID format');
      
      const { from, to, groupBy } = body;
      const progressData = await this.recyclerService.getProgress(from, to, numericId);
      const recyclerProgress = progressData.progress.find((p) => p.id === numericId);
  
      if (!recyclerProgress) throw new NotFoundException(`Recycler with ID ${numericId} not found`);
  
      if (groupBy) {
        const validKeys = ['acceptEvents', 'rejectEvents', 'totalWeight', 'totalEarning'];
        if (!validKeys.includes(groupBy)) throw new BadRequestException(`Invalid groupBy parameter. Valid options are: ${validKeys.join(', ')}`);
        
        return { [groupBy]: recyclerProgress[groupBy] || 0 };
      }
  
      // Return the progress data without dailyProgress field
      const { dailyProgress, ...response } = recyclerProgress; // Exclude dailyProgress
      return response;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      console.error('Unexpected error:', error);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
  
  @Post(':id/log-material')
  logMaterial(@Param('id') id: number, @Body() materialLogData: Partial<MaterialLog>) {
    return this.recyclerService.logMaterial(id, materialLogData);
  }
  


  // Accept event and increase acceptEvents and weight
  @Post('/accept-event/:recyclerId/:eventId')
  async acceptEvent(
    @Param('recyclerId') recyclerId: number,
    @Param('eventId') eventId: number,
    @Body('weight') weight: number,  // Pass weight for the event
  ) {
    return this.recyclerService.acceptEvent(recyclerId, eventId, weight);
  }






  // 2FA generation route
  @Post('generate-2fa/:id')
  async generate2fa(@Param('id') id: number) {
    const result = await this.recyclerService.generate2fa(id);
    return result;
  }

  // Endpoint to verify the 2FA code entered by the user
  @Post('verify-2fa/:id')
  async verify2fa(@Param('id') id: number, @Body() body: { token: string }) {
    const isValid = await this.recyclerService.verify2fa(id, body.token);
    return { isValid };
  }













  @Post(':eventId/join')
  @UseGuards(JwtAuthGuard,RoleGuard)  // Protect route with JWT guard
  async joinEvent(
    @Param('eventId') eventId: number,
    @Request() req,  // Access the request object
  ) {
    const recycler = req.user?.recycler;  // Safe access using optional chaining
    if (!recycler) {
      throw new Error('Recycler not found!');
    }
    return this.recyclerService.joinEvent(recycler.id, eventId);
  }

  @Post(':eventId/reject')
  @UseGuards(JwtAuthGuard,RoleGuard)  // Protect route with JWT guard
  async rejectEvent(
    @Param('eventId') eventId: number,
    @Request() req,  // Access the request object
  ) {
    const recycler = req.user?.recycler;  // Safe access using optional chaining
    if (!recycler) {
      throw new Error('Recycler not found!');
    }
    return this.recyclerService.rejectEvent(recycler.id, eventId);
  }











}
