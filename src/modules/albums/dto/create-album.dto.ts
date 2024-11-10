import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @ValidateIf((o) => o.artistId !== null)
  @IsNotEmpty()
  @IsUUID()
  artistId: string | null;
}
