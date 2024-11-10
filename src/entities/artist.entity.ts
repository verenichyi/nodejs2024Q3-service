import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Artist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @IsBoolean()
  @Column()
  grammy: boolean;

  @Exclude()
  @Column({ default: false })
  isFavorite: boolean;
}
