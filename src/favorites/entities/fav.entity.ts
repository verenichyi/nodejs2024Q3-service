import { IsUUID } from 'class-validator';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';

export class Fav {
  @IsUUID('4', { each: true })
  artists: string[];

  @IsUUID('4', { each: true })
  albums: string[];

  @IsUUID('4', { each: true })
  tracks: string[];

  constructor(partial: Partial<Fav>) {
    Object.assign(this, partial);
  }
}

export class FavEntities {
  @IsUUID('4', { each: true })
  artists: Artist[];

  @IsUUID('4', { each: true })
  albums: Album[];

  @IsUUID('4', { each: true })
  tracks: Track[];

  constructor(partial: Partial<Fav>) {
    Object.assign(this, partial);
  }
}
