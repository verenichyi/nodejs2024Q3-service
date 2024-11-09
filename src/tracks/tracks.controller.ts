import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllTracks(): Promise<Track[]> {
    return this.tracksService.getAllTracks();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return this.tracksService.getTrack(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.tracksService.createTrack(createTrackDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return this.tracksService.updateTrack(id, updateTrackDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.tracksService.deleteTrack(id);
  }
}
