import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
export enum Type {
  NORMAL = 'Normal',
  VIP = 'VIP',
}
@Entity('service')
export class Service {
  @PrimaryGeneratedColumn()
  serviceId: number;

  @Column()
  serviceName: string;

  @Column()
  categoryId: number;

  @Column({
    type: 'enum',
    enum: Type,
    default: Type.NORMAL,
  })
  type: Type;

  @Column()
  priceOptionId: number;
}
