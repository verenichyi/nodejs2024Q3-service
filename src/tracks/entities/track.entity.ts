import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from "class-transformer";

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

  @Column({ nullable: true })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;

  @Column()
  @IsNumber()
  duration: number;

  @Exclude()
  @Column({ default: false })
  isFavorite: boolean;
}
