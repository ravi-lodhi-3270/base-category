import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from './entity/srevice.entity';

@Controller('category')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post(':categoryId/service')
  async create(
    @Param('categoryId') categoryId: number,
    @Body() serviceData: Partial<Service>,
  ): Promise<Service> {
    try {
      return await this.serviceService.create(categoryId, serviceData);
    } catch (error) {
      throw new NotFoundException('Something went wrong');
    }
  }

  @Get(':categoryId/services')
  async findAll(@Param('categoryId') categoryId: number): Promise<Service[]> {
    try {
      const services =
        await this.serviceService.findAllByCategoryId(categoryId);
      if (!services || services.length === 0) {
        throw new NotFoundException('Data not found');
      }
      return services;
    } catch (error) {
      throw new NotFoundException('Something went wrong');
    }
  }

  @Delete(':categoryId/service/:serviceId')
  async remove(
    @Param('categoryId') categoryId: number,
    @Param('serviceId') serviceId: number,
  ): Promise<void> {
    try {
      await this.serviceService.remove(categoryId, serviceId);
    } catch (error) {
      throw new NotFoundException('Something went wrong');
    }
  }

  @Put(':categoryId/service/:serviceId')
  async update(
    @Param('categoryId') categoryId: number,
    @Param('serviceId') serviceId: number,
    @Body() serviceData: Partial<Service>,
  ): Promise<Service> {
    try {
      return await this.serviceService.update(
        categoryId,
        serviceId,
        serviceData,
      );
    } catch (error) {
      throw new NotFoundException('Something went wrong');
    }
  }
}
