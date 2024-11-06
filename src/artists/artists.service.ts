import { Injectable } from '@nestjs/common';
import DB from '../utils/DB/DB';
import Artist from './interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private database: DB) {}
  async getAllArtists(): Promise<Artist[]> {
    return await this.database.artists.findMany();
  }

  async getArtist(id: string): Promise<Artist> {
    return await this.database.artists.findOne({ key: 'id', equals: id });
  }

  async createArtist(track: CreateArtistDto): Promise<Artist> {
    return await this.database.artists.create(track);
  }

  async updateArtist(id: string, track: UpdateArtistDto): Promise<Artist> {
    return await this.database.artists.change(id, track);
  }

  async deleteArtist(id: string): Promise<Artist> {
    return await this.database.artists.delete(id);
  }

  async resetTracksArtistId(id: string): Promise<void> {
    const track = await this.database.tracks.findOne({
      key: 'artistId',
      equals: id,
    });

    await this.database.tracks.change(track.id, { artistId: null });
  }

  async resetAlbumsArtistId(id: string): Promise<void> {
    const album = await this.database.albums.findOne({
      key: 'artistId',
      equals: id,
    });

    await this.database.albums.change(album.id, { artistId: null });
  }
}
