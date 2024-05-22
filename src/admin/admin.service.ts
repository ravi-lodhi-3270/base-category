import { Injectable } from '@nestjs/common';
import { Admin } from './entity/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}
  
  checkAdminData(columnName: string, value: string) {
    return this.adminRepository
      .createQueryBuilder('ma')
      .select([
        'ma.adminId as adminId',
        'ma.name as name',
        'ma.email as email',
        'ma.password as password',
        'ma.status as status',
      ])
      .where(`ma.${columnName} = '${value}'`)
      .getRawOne();
  }

  async createAPIToken(apiResult) {
    const response = {
      success: 0,
      message: '',
      token: '',
    };
    try {
      if (!apiResult) {
        const err = { code: 404, message: 'No data found.' };
        throw err;
      }

      const secretKey = 'JWTSECRECT@123';
      if (!secretKey && !secretKey.length) {
        const err = { code: 404, message: 'Authentication key not found.' };
        throw err;
      }

      const expiryTime = 180;

      const tokenExpiry = Number(expiryTime) * 60 * 60;

      const tokenIssuer = 'localhost:3000/';

      const tokenAudience = 'localhost:3000/';

      const tokenAlgo = 'HS256';

      const tokenOptions: any = {
        algorithm: tokenAlgo,
        issuer: tokenIssuer,
        audience: tokenAudience,
        expiresIn: tokenExpiry,
      };
      const jwtToken = this.jwtService.sign(
        { ...apiResult },
        {
          secret: secretKey,
          ...tokenOptions,
        },
      );

      response.success = 1;
      response.message = 'JWT token created';
      response.token = jwtToken ? jwtToken.toString() : '';
    } catch (err) {
      if (typeof err === 'object') {
        if (err.message) {
          response.message = err.message;
        } else {
          response.message = 'Unable to show error message.';
        }
      } else if (typeof err === 'string') {
        response.message = err;
      }
    }
    return response;
  }
}
