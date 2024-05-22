import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  categoryName: string;
}
