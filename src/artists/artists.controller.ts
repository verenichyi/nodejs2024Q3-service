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
import { ArtistsService } from './artists.service';
import Artist from './interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
    private readonly favoritesService: FavoritesService,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllArtists(): Promise<Artist[]> {
    return await this.artistsService.getAllArtists();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Artist> {
    const artist = await this.artistsService.getArtist(id);
    if (!artist) {
      throw new HttpException(`Artist doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return await this.artistsService.createArtist(createArtistDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistsService.getArtist(id);
    if (!artist) {
      throw new HttpException(`Artist doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return await this.artistsService.updateArtist(id, updateArtistDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    const artist = await this.artistsService.getArtist(id);
    if (!artist) {
      throw new HttpException(`Artist doesn't exist`, HttpStatus.NOT_FOUND);
    }

    await this.artistsService.resetTracksArtistId(id);
    await this.artistsService.resetAlbumsArtistId(id);
    await this.favoritesService.deleteArtistFromFavorites(id);
    await this.artistsService.deleteArtist(id);
  }
}
