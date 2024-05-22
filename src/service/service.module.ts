import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { Service } from './entity/srevice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicePriceOption } from './entity/service-price.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Service, ServicePriceOption])],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
