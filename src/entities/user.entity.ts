import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';

const dateToNumber: ValueTransformer = {
  to: (value: Date): Date => value,
  from: (value: Date): number => value.getTime(),
};

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @Column()
  version!: number;

  @CreateDateColumn({ type: 'timestamp', transformer: dateToNumber })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', transformer: dateToNumber })
  updatedAt!: Date;
}
