import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Status {
  Active = 'Active',
  Inactive = 'Inactive',
}

@Entity('mod_admin')
export class Admin {
  @PrimaryGeneratedColumn({ name: 'iAdminId' })
  adminId?: number;

  @Column({ name: 'vName' })
  name: string;

  @Column({ unique: true, name: 'vEmail' })
  email: string;

  @Column({ nullable: true, name: 'vPassword' })
  password?: string;

  @Column({ name: 'vPhoneNumber' })
  phoneNumber: string;

  @CreateDateColumn({
    name: 'dtAddedDate',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  addedDate?: Date;

  @UpdateDateColumn({ name: 'dtModifiedDate' })
  modifiedDate?: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Active,
    name: 'eStatus',
  })
  status?: Status;
}
