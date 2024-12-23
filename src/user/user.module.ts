// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../recycler/entities/recycler/user.entity';
import { Recycler } from 'src/recycler/entities/recycler/recycler.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RecyclerModule } from 'src/recycler/recycler.module';

@Module({
  imports: [TypeOrmModule.forFeature([User,Recycler]),RecyclerModule],
  providers: [UserService,JwtStrategy],
  exports: [UserService],  // Ensure the UserService is exported
})
export class UserModule {}
