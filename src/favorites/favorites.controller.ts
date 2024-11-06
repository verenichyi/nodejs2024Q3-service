import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import FavoritesResponse from './interfaces/favorites-response.interface';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllFavorites(): Promise<FavoritesResponse> {
    return await this.favoritesService.getAllFavorites();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('artist/:id')
  async addArtistToFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    const artist = await this.artistsService.getArtist(id);
    if (!artist) {
      throw new HttpException(
        `Artist doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.favoritesService.addArtistToFavorites(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async deleteArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    const favoriteArtistsIds = this.favoritesService.getFavoriteArtistsIds();
    const isFavoriteArtist = favoriteArtistsIds.find(
      (artistId) => artistId === id,
    );

    if (!isFavoriteArtist) {
      throw new HttpException(`Artist is not favorite`, HttpStatus.NOT_FOUND);
    }

    await this.favoritesService.deleteArtistFromFavorites(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('album/:id')
  async addAlbumToFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    const album = await this.albumsService.getAlbum(id);
    if (!album) {
      throw new HttpException(
        `Album doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.favoritesService.addAlbumToFavorites(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async deleteAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    const favoriteAlbumsIds = this.favoritesService.getFavoriteAlbumsIds();
    const isFavoriteAlbum = favoriteAlbumsIds.find((albumId) => albumId === id);

    if (!isFavoriteAlbum) {
      throw new HttpException(`Album is not favorite`, HttpStatus.NOT_FOUND);
    }

    await this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('track/:id')
  async addTrackToFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    const track = await this.tracksService.getTrack(id);
    if (!track) {
      throw new HttpException(
        `Track doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.favoritesService.addTrackToFavorites(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async deleteTrackFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    const favoriteTracksIds = this.favoritesService.getFavoriteTracksIds();
    const isFavoriteTrack = favoriteTracksIds.find((trackId) => trackId === id);

    if (!isFavoriteTrack) {
      throw new HttpException(`Track is not favorite`, HttpStatus.NOT_FOUND);
    }

    await this.favoritesService.deleteTrackFromFavorites(id);
  }
}
