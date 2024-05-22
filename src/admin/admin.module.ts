import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entity/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stratgy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({ signOptions: { expiresIn: '1d' } }),
  ],
  providers: [AdminService, JwtService, JwtStrategy],
  controllers: [AdminController],
})
export class AdminModule {}
