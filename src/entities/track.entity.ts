import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Album } from './album.entity';

@Entity()
export class Track extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;

  @OneToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn()
  artist: Album;

  @Column({ nullable: true })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;

  @OneToOne(() => Album, { onDelete: 'SET NULL' })
  @JoinColumn()
  album: Album;

  @Column()
  @IsNumber()
  duration: number;

  @Exclude()
  @Column({ default: false })
  isFavorite: boolean;
}
