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
import { AlbumsService } from './albums.service';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from '../../entities/album.entity';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllAlbums(): Promise<Album[]> {
    return this.albumsService.getAllAlbums();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    return this.albumsService.getAlbum(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.albumsService.deleteAlbum(id);
  }
}
