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

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllAlbums(): Promise<Album[]> {
    return await this.albumsService.getAllAlbums();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    const artist = await this.albumsService.getAlbum(id);
    if (!artist) {
      throw new HttpException(`Artist doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return artist;
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
    const artist = await this.albumsService.getAlbum(id);
    if (!artist) {
      throw new HttpException(`Artist doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return await this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    const artist = await this.albumsService.getAlbum(id);
    if (!artist) {
      throw new HttpException(`Artist doesn't exist`, HttpStatus.NOT_FOUND);
    }

    await this.albumsService.deleteAlbum(id);
  }
}
