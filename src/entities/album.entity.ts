import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsInt()
  year: number;

  @Column({ nullable: true })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;

  @OneToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn()
  artist: Album;

  @Exclude()
  @Column({ default: false })
  isFavorite: boolean;
}
