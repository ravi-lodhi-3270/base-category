import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
export enum Type {
  HOURLY = 'Hourly',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
}
@Entity('service_price')
export class ServicePriceOption {
  @PrimaryGeneratedColumn()
  priceOptionId: number;

  @Column()
  serviceId: number;

  @Column()
  duration: number;

  @Column({
    type: 'enum',
    enum: Type,
    default: Type.MONTHLY,
  })
  type: Type;

  @Column()
  price: number;
}
