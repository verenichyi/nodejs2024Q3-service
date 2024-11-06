import { Injectable } from '@nestjs/common';
import DB from '../utils/DB/DB';
import Track from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private database: DB) {}

  async getAllTracks(): Promise<Track[]> {
    return await this.database.tracks.findMany();
  }

  async getTrack(id: string): Promise<Track> {
    return await this.database.tracks.findOne({ key: 'id', equals: id });
  }

  async getTrackByAlbumId(id: string): Promise<Track> {
    return await this.database.tracks.findOne({ key: 'albumId', equals: id });
  }

  async getTrackByArtistId(id: string): Promise<Track> {
    return await this.database.tracks.findOne({ key: 'artistId', equals: id });
  }

  async createTrack(track: CreateTrackDto): Promise<Track> {
    return await this.database.tracks.create(track);
  }

  async updateTrack(id: string, track: UpdateTrackDto): Promise<Track> {
    return await this.database.tracks.change(id, track);
  }

  async deleteTrack(id: string): Promise<Track> {
    return await this.database.tracks.delete(id);
  }
}
