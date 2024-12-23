import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recycler } from './entities/recycler/recycler.entity'; 
import { MaterialLog } from './entities/recycler/material.entity';
import { Event } from './entities/recycler/event.entity';
import * as speakeasy from 'speakeasy';
import * as nodemailer from 'nodemailer';
import { RecyclerEvent } from './entities/recycler/event_recycler.entity';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from './entities/recycler/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';

@Injectable()
export class RecyclerService {

  applyPayment(paymentDetails: any) {
    throw new Error('Method not implemented.');
  }

  findOne(id: string) {
    throw new Error('Method not implemented.');
  }
  async findById(id: number): Promise<Recycler | null> {
    return this.recyclerRepository.findOne({ where: { id } }) || null;
  }
  constructor(
    @InjectRepository(Recycler) // Ensure that the Recycler repository is injected correctly
    private readonly recyclerRepository: Repository<Recycler>,
      
    @InjectRepository(MaterialLog)
    private readonly materialLogRepository: Repository<MaterialLog>,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    
    @InjectRepository(RecyclerEvent)
    private recyclerEventRepository: Repository<RecyclerEvent>,
    
  ) {}
  private events: Event[] = []; 
  
  getProfile(userId: number) {
    const user = this.recyclerRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  


    private getCurrentMonthYear(): string {
      const date = new Date();
      return `${date.getFullYear()}-${date.getMonth() + 1}`; // Format as 'YYYY-MM'
    }
  
    private getBonusType(earnings: number): number {
      if (earnings >= 1000) {
        return 200;
      } else if (earnings >= 500) {
        return 120;
      } else if (earnings >= 250) {
        return 60;
      } else if (earnings >= 100) {
        return 25;
      } else if (earnings >= 50) {
        return 10;
      }
      return 0;
    }
  
    async addEarnings(recyclerId: number, earnings: number) {
      const recycler = await this.recyclerRepository.findOne({ where: { id: recyclerId } });
  
      if (!recycler) {
        return { message: 'Recycler not found', data: null };
      }
  
      const currentMonthYear = this.getCurrentMonthYear();
      const bonusType = this.getBonusType(earnings);
  
      // Always add earnings first
      recycler.unpaidEarnings = (recycler.unpaidEarnings || 0) + earnings;
  
      // Handle daily earnings
      const today = new Date().toLocaleString('en-US', { weekday: 'long' });
      recycler.dailyEarnings = recycler.dailyEarnings || {};
      recycler.dailyEarnings[today] = (recycler.dailyEarnings[today] || 0) + earnings;
  
      // If earnings are below 50, no bonus is applicable, return the earnings added
      if (bonusType === 0) {
        await this.recyclerRepository.save(recycler);
        return { message: 'Earnings added, but no bonus as earnings are below 50', data: recycler };
      }
  
      // **Bonus Claim Check**: If the recycler has already claimed the same bonus this month, don't allow them to claim again.
      if (recycler.lastBonusClaimed === currentMonthYear && recycler.lastBonusClaimedType === bonusType) {
        // User can still earn money, but they won’t get a bonus
        await this.recyclerRepository.save(recycler);
        return { message: `You have already claimed the ${bonusType} bonus this month. Earnings added without bonus.`, data: recycler };
      }
  
      // If bonus is available, grant it
      recycler.unpaidBonuses = (recycler.unpaidBonuses || 0) + bonusType;
  
      // Record the bonus claim for this month and this bonus type
      recycler.lastBonusClaimed = currentMonthYear;
      recycler.lastBonusClaimedType = bonusType;
  
      // Save the recycler's updated information with bonus claim
      await this.recyclerRepository.save(recycler);
  
      return { message: 'Earnings and bonus updated successfully', data: recycler };
    }
  
    private getYesterday(): string {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      return date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    }
  
    async getTodaysAndYesterdaysEarnings(recyclerId: number) {
      const recycler = await this.recyclerRepository.findOne({ where: { id: recyclerId } });
      if (!recycler) {
        return { message: 'Recycler not found', data: null };
      }
  
      const today = new Date().toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
      const yesterday = this.getYesterday(); // Ensure it's in the same format  
      const todaysEarnings = recycler.dailyEarnings?.[today] || 0;
      const yesterdaysEarnings = recycler.dailyEarnings?.[yesterday] || 0;
      return {
        message: 'Today and Yesterday\'s earnings fetched',
        data: {
          today: todaysEarnings,
          yesterday: yesterdaysEarnings,
        },
      };
    }



  async getFinancials(id: number): Promise<Partial<Recycler>> {
    const recycler = await this.recyclerRepository.findOne({ where: { id } });
    recycler.wallet = recycler.wallet || 0;
    if (!recycler) {
        throw new NotFoundException('Recycler not found');
    }
    return {
        unpaidEarnings: recycler.unpaidEarnings,
        unpaidBonuses: recycler.unpaidBonuses,
        wallet: recycler.unpaidEarnings+recycler.unpaidBonuses,
    };
  }
  async updatePassword(id: number, newPassword: string, oldPassword: string): Promise<{ message: string }> {
    const recycler = await this.recyclerRepository.findOne({ where: { id } });
    if (!recycler) {
      throw new NotFoundException('Recycler not found');
    }
    if (recycler.password !== oldPassword) {
      throw new BadRequestException('Old password is incorrect');
    }
    recycler.password = newPassword;
    await this.recyclerRepository.save(recycler);
    return { message: 'Password updated successfully' };
  }
  
  async getProgress(from: string, to: string, id: number): Promise<any> {
    // Find recycler by ID
    const recycler = await this.recyclerRepository.findOne({ where: { id } });
    if (!recycler) {
      throw new Error(`Recycler with ID ${id} not found`);
    }
  
    // Initialize totals to 0
    const grandTotals = {
      totalEarning: 0,
      totalWeight: 0,
      totalAcceptEvents: 0,
      totalRejectEvents: 0,
    };
  
    const result = [];
  
    // Initialize daily progress tracker
    const dailyProgress = {};
  
    // Loop through dailyProgress and calculate totals per day
    for (const [day, progress] of Object.entries(recycler.dailyProgress || {})) {
      const dailyWeight = progress as number; // Ensure weight is treated as a number
  
      // If the date is within the specified range, accumulate the data
      if (day >= from && day <= to) {
        dailyProgress[day] = {
          weight: dailyWeight,
          acceptEvents: recycler.acceptEvents || 0, // Assuming daily accepted events count
          rejectEvents: recycler.rejectEvents || 0, // Assuming daily rejected events count
        };
  
        // Update grand totals
        grandTotals.totalWeight += dailyWeight;
        grandTotals.totalAcceptEvents += recycler.acceptEvents || 0;
        grandTotals.totalRejectEvents += recycler.rejectEvents || 0; // Update rejectEvents based on the range
      }
    }
  
    // Update other totals (regardless of date range)
    grandTotals.totalEarning += recycler.earning || 0;
  
    // Create the response object
    const progress = {
      id: recycler.id,
      totalWeight: grandTotals.totalWeight,
      totalAcceptEvents: grandTotals.totalAcceptEvents,
      totalRejectEvents: grandTotals.totalRejectEvents,
    };
  
    result.push(progress);
  
    return {
      progress: result,
      totals: grandTotals,
    };
  }
  
  
  
  async logMaterial(recyclerId: number, materialLogData: Partial<MaterialLog>): Promise<MaterialLog> {
    const materialLog = this.materialLogRepository.create({
      ...materialLogData,
      recycler: { id: recyclerId },
    });
    return this.materialLogRepository.save(materialLog);
  }

  
  async acceptEvent(recyclerId: number, eventId: number, weight: number): Promise<any> {
    const recycler = await this.recyclerRepository.findOne({ where: { id: recyclerId } });
    if (!recycler) {
      throw new NotFoundException('Recycler not found');
    }
  
    // Increment acceptEvents
    recycler.acceptEvents = (recycler.acceptEvents || 0) + 1;
  
    // Initialize dailyProgress if it doesn't exist
    recycler.dailyProgress = recycler.dailyProgress || {};
  
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0]; // Example: "2024-12-17"
  
    // Update today's weight in dailyProgress
    recycler.dailyProgress[today] = (recycler.dailyProgress[today] || 0) + weight;
  
    // Save the updated recycler data
    await this.recyclerRepository.save(recycler);
  
    return {
      message: 'Event accepted and daily progress updated.',
      data: recycler,
    };
  }
  
  















  // Method to join an event
  async joinEvent(recyclerId: number, eventId: number): Promise<RecyclerEvent> {
    const recycler = await this.recyclerRepository.findOne({ where: { id: recyclerId } });
    const event = await this.eventRepository.findOne({ where: { id: eventId } });

    if (!recycler || !event) {
      throw new Error('Recycler or Event not found');
    }

    // Check if the recycler has already joined or rejected the event
    const existingRecyclerEvent = await this.recyclerEventRepository.findOne({
      where: { recycler: recycler, event: event },
    });

    if (existingRecyclerEvent) {
      throw new Error('Recycler has already responded to this event');
    }

    // Create a new RecyclerEvent and set the status to 'joined'
    const recyclerEvent = this.recyclerEventRepository.create({
      recycler,
      event,
      status: 'joined',
    });

    return this.recyclerEventRepository.save(recyclerEvent);
  }

  // Method to reject an event
  async rejectEvent(recyclerId: number, eventId: number): Promise<RecyclerEvent> {
    const recycler = await this.recyclerRepository.findOne({ where: { id: recyclerId } });
    const event = await this.eventRepository.findOne({ where: { id: eventId } });

    if (!recycler || !event) {
      throw new Error('Recycler or Event not found');
    }

    // Check if the recycler has already joined or rejected the event
    const existingRecyclerEvent = await this.recyclerEventRepository.findOne({
      where: { recycler: recycler, event: event },
    });

    if (existingRecyclerEvent) {
      throw new Error('Recycler has already responded to this event');
    }

    // Create a new RecyclerEvent and set the status to 'rejected'
    const recyclerEvent = this.recyclerEventRepository.create({
      recycler,
      event,
      status: 'rejected',
    });

    return this.recyclerEventRepository.save(recyclerEvent);
  }
























   // Method to get user by ID from the database
   async getUserById(userId: number): Promise<Recycler | null> {
    const user = await this.recyclerRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Method to generate 2FA and send it via email
  async generate2fa(id: number) {
    const user = await this.recyclerRepository.findOne({ where: { id } });

    // Check if user exists
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user has a valid email
    if (!user.email) {
      console.warn(`User ${id} does not have a valid email address.`);
      return {
        message: '2FA generated, but no valid email address found for this user.',
      };
    }

    // Proceed with 2FA generation using speakeasy
    const secret = speakeasy.generateSecret();
    user.twofaSecret = secret.base32; // Save the 2FA secret in the user object

    // Save the user with the new 2FA secret
    await this.recyclerRepository.save(user);

    // Generate a code based on the secret (valid for 30 seconds)
    const code = speakeasy.totp({
      secret: user.twofaSecret,
      encoding: 'base32',
    });

    // Send the 2FA code via email
    try {
      await this.sendEmail(user.email, code);
    } catch (error) {
      console.error('Error sending 2FA email:', error);
      throw new Error('Failed to send 2FA email');
    }

    return {
      message: '2FA secret generated and code sent to email',
      secret: secret.base32,
    };
  }

  // Method to send an email
  private async sendEmail(email: string, code: string): Promise<void> {
    // Create a transporter for sending the email using Gmail (you can change this based on your email provider)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or any other email service
      secure: true,  // Use SSL
      port: 465, 
      auth: {
        user: 'apurbo810@gmail.com', // Your email address
        pass: 'ilgvzuosxwybfyqj', // Your email password (use environment variables in production)
      },
    });

    // Email options
    const mailOptions = {
      from: 'apurbo810@gmail.com', // Your email address
      to: email,
      subject: 'Your 2FA Code',
      text: `Your 2FA code is: ${code}. This code is valid for 30 seconds.`,
    };

    // Try to send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log('2FA code sent to:', email);
    } catch (error) {
      console.error('Error sending 2FA email:', error);
      throw new Error('Failed to send 2FA email');
    }
  }

    // Method to verify the 2FA code entered by the user
    async verify2fa(userId: number, token: string): Promise<boolean> {
      const user = await this.getUserById(userId); // Retrieve user from database
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      // Verify the token entered by the user
      const isValid = speakeasy.totp.verify({
        secret: user.twofaSecret,
        encoding: 'base32',
        token,
        window: 1, // Allow for a small time window for code validity
      });
  
      return isValid;
    }

}






