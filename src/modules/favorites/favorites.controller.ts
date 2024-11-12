import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavEntities } from '../../entities/fav.entity';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllFavorites(): Promise<FavEntities> {
    return this.favoritesService.getAllFavorites();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('artist/:id')
  async addArtistToFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.favoritesService.addArtistToFavorites(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async deleteArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteArtistFromFavorites(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('album/:id')
  async addAlbumToFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.favoritesService.addAlbumToFavorites(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async deleteAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('track/:id')
  async addTrackToFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.favoritesService.addTrackToFavorites(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async deleteTrackFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteTrackFromFavorites(id);
  }
}
