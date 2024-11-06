import { Injectable } from '@nestjs/common';
import DB from '../utils/DB/DB';
import Artist from './interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private database: DB) {}
  async getAllArtists(): Promise<Artist[]> {
    return this.database.artists.findMany();
  }

  async getArtist(id: string): Promise<Artist> {
    return this.database.artists.findOne({ key: 'id', equals: id });
  }

  async createArtist(track: CreateArtistDto): Promise<Artist> {
    return this.database.artists.create(track);
  }

  async updateArtist(id: string, track: UpdateArtistDto): Promise<Artist> {
    return this.database.artists.change(id, track);
  }

  async deleteArtist(id: string): Promise<Artist> {
    return this.database.artists.delete(id);
  }
}
