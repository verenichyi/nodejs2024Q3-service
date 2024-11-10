import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from '../../entities/album.entity';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
    private readonly tracksService: TracksService,
  ) {}
  async getAllAlbums(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async getAlbum(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) {
      throw new HttpException(`Album doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return album;
  }

  async getAlbumByArtistId(id: string): Promise<Album> {
    return await this.albumRepository.findOne({ where: { artistId: id } });
  }

  async createAlbum(albumDtp: CreateAlbumDto): Promise<Album> {
    const { name, artistId, year } = albumDtp;

    const newAlbum = this.albumRepository.create({
      name,
      artistId,
      year,
    });

    await this.albumRepository.save(newAlbum);
    return newAlbum;
  }

  async updateAlbum(id: string, albumDto: UpdateAlbumDto): Promise<Album> {
    const { name, artistId, year } = albumDto;
    const album = await this.getAlbum(id);

    album.name = name;
    album.artistId = artistId;
    album.year = year;

    await this.albumRepository.save(album);
    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = await this.getAlbum(id);

    // const track = await this.tracksService.getTrackByAlbumId(id);
    // if (track) {
    //   await this.tracksService.updateTrack(track.id, { albumId: null });
    // }

    await this.albumRepository.delete({ id: album.id });
  }

  async getFavoriteAlbums(): Promise<Album[]> {
    return this.albumRepository.find({
      where: { isFavorite: true },
      select: ['id', 'name', 'year', 'artistId'],
    });
  }

  async addFavoriteAlbum(id: string): Promise<void> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new HttpException(
        `Album doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    album.isFavorite = true;
    await this.albumRepository.save(album);
  }

  async deleteFavoriteAlbum(id: string): Promise<void> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album || !album.isFavorite) {
      throw new HttpException(`Album is not favorite`, HttpStatus.NOT_FOUND);
    }

    album.isFavorite = false;
    await this.albumRepository.save(album);
  }
}
