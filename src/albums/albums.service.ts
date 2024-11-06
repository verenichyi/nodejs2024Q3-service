import { Injectable } from '@nestjs/common';
import DB from '../utils/DB/DB';
import Album from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private database: DB) {}
  async getAllAlbums(): Promise<Album[]> {
    return await this.database.albums.findMany();
  }

  async getAlbum(id: string): Promise<Album> {
    return await this.database.albums.findOne({ key: 'id', equals: id });
  }

  async getAlbumByArtistId(id: string): Promise<Album> {
    return await this.database.albums.findOne({ key: 'artistId', equals: id });
  }

  async createAlbum(album: CreateAlbumDto): Promise<Album> {
    return await this.database.albums.create(album);
  }

  async updateAlbum(id: string, album: UpdateAlbumDto): Promise<Album> {
    return await this.database.albums.change(id, album);
  }

  async deleteAlbum(id: string): Promise<Album> {
    return await this.database.albums.delete(id);
  }
}
