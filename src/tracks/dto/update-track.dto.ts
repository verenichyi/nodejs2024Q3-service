import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @ValidateIf((o) => o.artistId !== null)
  @IsNotEmpty()
  @IsUUID()
  artistId: string | null;
  @ValidateIf((o) => o.albumId !== null)
  @IsNotEmpty()
  @IsUUID()
  albumId: string | null;
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
