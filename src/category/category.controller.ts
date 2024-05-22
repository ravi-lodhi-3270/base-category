import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() categoryData: Partial<Category>): Promise<Category> {
    try {
      return await this.categoryService.create(categoryData);
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  @Get()
  async findAll(): Promise<Category[]> {
    try {
      const categories = await this.categoryService.findAll();
      if (!categories || categories.length === 0) {
        throw new NotFoundException('Data not found');
      }
      return categories;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  @Get(':id')
  async findOne(@Param('id') categoryId: number): Promise<Category> {
    try {
      const category = await this.categoryService.findOne(categoryId);
      if (!category) {
        throw new NotFoundException('Data not found');
      }
      return category;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() categoryData: Partial<Category>,
  ): Promise<Category> {
    try {
      return await this.categoryService.update(id, categoryData);
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  @Delete(':id')
  async removeEmptyCategory(@Param('id') id: number) {
    try {
      const hasServices = await this.categoryService.hasServices(id);
      if (!hasServices) {
        await this.categoryService.remove(id);
        return { message: 'Empty category deleted successfully' };
      } else {
        throw new BadRequestException(
          'Category contains services, cannot be deleted',
        );
      }
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }
}
