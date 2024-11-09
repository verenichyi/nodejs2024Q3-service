import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}
  async getAllArtists(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async getArtist(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new HttpException(`Artist doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  async createArtist(artist: CreateArtistDto): Promise<Artist> {
    const { name, grammy } = artist;

    const newArtist = this.artistRepository.create({
      name,
      grammy,
    });

    await this.artistRepository.save(newArtist);
    return newArtist;
  }

  async updateArtist(id: string, artistDto: UpdateArtistDto): Promise<Artist> {
    const { name, grammy } = artistDto;
    const artist = await this.getArtist(id);

    artist.name = name;
    artist.grammy = grammy;

    await this.artistRepository.save(artist);
    return artist;
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = await this.getArtist(id);

    const track = await this.tracksService.getTrackByArtistId(id);
    if (track) {
      await this.tracksService.updateTrack(track.id, { artistId: null });
    }

    const album = await this.albumsService.getAlbumByArtistId(id);
    if (album) {
      await this.albumsService.updateAlbum(album.id, { artistId: null });
    }

    await this.artistRepository.delete({ id: artist.id });
  }

  async getFavoriteArtists(): Promise<Artist[]> {
    return this.artistRepository.find({ where: { isFavorite: true } });
  }

  async addFavoriteArtist(id: string): Promise<void> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new HttpException(
        `Artist doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    artist.isFavorite = true;
    await this.artistRepository.save(artist);
  }

  async deleteFavoriteArtist(id: string): Promise<void> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist || !artist.isFavorite) {
      throw new HttpException(`Artist is not favorite`, HttpStatus.NOT_FOUND);
    }

    artist.isFavorite = false;
    await this.artistRepository.save(artist);
  }
}
