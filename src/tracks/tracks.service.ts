import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { Track } from "./entities/track.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  async getAllTracks(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async getTrack(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new HttpException(`Track doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async getTrackByAlbumId(id: string): Promise<Track> {
    return await this.trackRepository.findOne({ where: { albumId: id } });
  }

  async getTrackByArtistId(id: string): Promise<Track> {
    return await this.trackRepository.findOne({ where: { artistId: id } });
  }

  async createTrack(trackDto: CreateTrackDto): Promise<Track> {
    const { name, albumId, artistId, duration } = trackDto;

    const newTrack = this.trackRepository.create({
      name,
      albumId,
      artistId,
      duration,
    });

    await this.trackRepository.save(newTrack);
    return newTrack;
  }

  async updateTrack(id: string, trackDto: UpdateTrackDto): Promise<Track> {
    const { name, albumId, artistId, duration } = trackDto;
    const track = await this.getTrack(id);

    track.name = name;
    track.albumId = albumId;
    track.artistId = artistId;
    track.duration = duration;

    await this.trackRepository.save(track);

    return track;
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.getTrack(id);

    if (!track) {
      throw new HttpException(`Track doesn't exist`, HttpStatus.NOT_FOUND);
    }

    await this.trackRepository.delete(id);
  }

  async getFavoriteTracks(): Promise<Track[]> {
    return this.trackRepository.find({ where: { isFavorite: true } });
  }

  async addFavoriteTrack(id: string): Promise<void> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new HttpException(
        `Track doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    track.isFavorite = true;
    await this.trackRepository.save(track);
  }

  async deleteFavoriteTrack(id: string): Promise<void> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track || !track.isFavorite) {
      throw new HttpException(`Track is not favorite`, HttpStatus.NOT_FOUND);
    }

    track.isFavorite = false;
    await this.trackRepository.save(track);
  }
}
