import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entity/srevice.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(
    categoryId: number,
    serviceData: Partial<Service>,
  ): Promise<Service> {
    const service = this.serviceRepository.create({
      ...serviceData,
      categoryId,
    });
    return await this.serviceRepository.save(service);
  }

  async findAllByCategoryId(categoryId: number): Promise<Service[]> {
    return this.serviceRepository.find({ where: { categoryId } });
  }

  async remove(categoryId: number, serviceId: number): Promise<void> {
    const service = await this.serviceRepository.findOne({
      where: { serviceId, categoryId },
    });
    if (!service) {
      throw new NotFoundException('Service not found in this category');
    }
    await this.serviceRepository.remove(service);
  }

  async update(
    categoryId: number,
    serviceId: number,
    serviceData: Partial<Service>,
  ): Promise<Service> {
    const service = await this.serviceRepository.findOne({
      where: { serviceId, categoryId },
    });
    if (!service) {
      throw new NotFoundException('Service not found in this category');
    }
    await this.serviceRepository.update({ serviceId, categoryId }, serviceData);
    return await this.serviceRepository.findOne({
      where: { serviceId, categoryId },
    });
  }
}
