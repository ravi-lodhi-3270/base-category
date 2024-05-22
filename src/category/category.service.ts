import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(categoryData: Partial<Category>): Promise<Category> {
    const newCategory = this.categoryRepository.create(categoryData);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(categoryId: number): Promise<Category> {
    return await this.categoryRepository.findOne({ where: { categoryId } });
  }

  async update(id: number, categoryData: Partial<Category>): Promise<Category> {
    const existingCategory = await this.findOne(id);
    await this.categoryRepository.merge(existingCategory, categoryData);
    return this.categoryRepository.save(existingCategory);
  }

  async hasServices(id: number): Promise<boolean> {
    const count = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('service', 's', 's.categoryId = category.categoryId')
      .where('category.categoryId = :id', { id })
      .select('COUNT(s.serviceId)', 'count')
      .getRawOne();

    return parseInt(count.count) > 0;
  }

  async remove(id: number): Promise<void> {
    const hasServices = await this.hasServices(id);
    if (!hasServices) {
      const result = await this.categoryRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
    } else {
      throw new BadRequestException(
        'Category contains services, cannot be deleted',
      );
    }
  }
}
