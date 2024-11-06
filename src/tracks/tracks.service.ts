import { Injectable } from '@nestjs/common';
import DB from '../utils/DB/DB';
import Track from './interfaces/track.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private database: DB) {}
  async getAllTracks(): Promise<Track[]> {
    return this.database.tracks.findMany();
  }

  async getTrack(id: string): Promise<Track> {
    return this.database.tracks.findOne({ key: 'id', equals: id });
  }

  async createTrack(track: CreateTrackDto): Promise<Track> {
    return this.database.tracks.create(track);
  }

  async updateTrack(id: string, track: UpdateTrackDto): Promise<Track> {
    return this.database.tracks.change(id, track);
  }

  async deleteTrack(id: string): Promise<Track> {
    return this.database.tracks.delete(id);
  }
}
