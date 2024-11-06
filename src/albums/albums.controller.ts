import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import Album from './interfaces/album.interface';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
    private readonly favoritesService: FavoritesService,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllAlbums(): Promise<Album[]> {
    return await this.albumsService.getAllAlbums();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    const album = await this.albumsService.getAlbum(id);
    if (!album) {
      throw new HttpException(`Album doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return album;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumsService.createAlbum(createAlbumDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.albumsService.getAlbum(id);
    if (!album) {
      throw new HttpException(`Album doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return await this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    const album = await this.albumsService.getAlbum(id);
    if (!album) {
      throw new HttpException(`Album doesn't exist`, HttpStatus.NOT_FOUND);
    }

    const track = await this.tracksService.getTrackByAlbumId(id);
    if (track) {
      await this.tracksService.updateTrack(track.id, { albumId: null });
    }

    const favoriteAlbumsIds = this.favoritesService.getFavoriteAlbumsIds();
    const isFavoriteAlbum = favoriteAlbumsIds.find((albumId) => albumId === id);
    if (isFavoriteAlbum) {
      await this.favoritesService.deleteAlbumFromFavorites(id);
    }

    await this.albumsService.deleteAlbum(id);
  }
}
