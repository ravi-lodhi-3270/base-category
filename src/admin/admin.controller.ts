import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AdminLoginDto } from './dto/login.dto';
import { AdminService } from './admin.service';
import { Public } from 'src/decorators/jwt-auth.decorator';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Public()
  @Post('login')
  async adminLogin(@Body() body: AdminLoginDto) {
    try {
      const result = {
        success: false,
        message: 'Unauthorized user',
        data: null,
      };

      const adminData = await this.adminService.checkAdminData(
        'email',
        body.email,
      );

      if (!adminData) {
        throw new HttpException('Unauthorized user', HttpStatus.UNAUTHORIZED);
      }

      if (adminData.password !== body.password) {
        throw new HttpException(
          'Password not matched! Please try again.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const tokenDetails = {
        adminId: adminData.adminId,
        name: adminData.name,
        email: adminData.email,
      };

      const tokenResult = await this.adminService.createAPIToken(tokenDetails);

      if (!tokenResult.success) {
        throw new HttpException(
          'Failed to generate token',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      result.success = true;
      result.message = 'Admin login successful';
      result.data = {
        ...tokenDetails,
        access_token: tokenResult.token,
      };

      return result;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
