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
import Track from './interfaces/track.interface';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoritesService } from '../favorites/favorites.service';

@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllTracks(): Promise<Track[]> {
    return await this.tracksService.getAllTracks();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    const track = await this.tracksService.getTrack(id);
    if (!track) {
      throw new HttpException(`Track doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return track;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.tracksService.createTrack(createTrackDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.tracksService.getTrack(id);
    if (!track) {
      throw new HttpException(`Track doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return await this.tracksService.updateTrack(id, updateTrackDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    const track = await this.tracksService.getTrack(id);
    if (!track) {
      throw new HttpException(`Track doesn't exist`, HttpStatus.NOT_FOUND);
    }

    await this.favoritesService.deleteTrackFromFavorites(id);

    await this.tracksService.deleteTrack(id);
  }
}
