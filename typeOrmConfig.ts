import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: `127.0.0.1`,
      port: 3306,
      username: 'root',
      password: '',
      database: 'category_service',
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: false,
      //logging: ['error'],
      logging: true,
    };
  }
}
