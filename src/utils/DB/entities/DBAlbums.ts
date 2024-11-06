import * as uuid from 'uuid';
import DBEntity from './DBEntity';
import Album from '../../../albums/interfaces/album.interface';
import { UpdateAlbumDto } from '../../../albums/dto/update-album.dto';
import { CreateAlbumDto } from '../../../albums/dto/create-album.dto';

export default class DBAlbums extends DBEntity<
  Album,
  UpdateAlbumDto,
  CreateAlbumDto
> {
  constructor() {
    super();
    this.entities = [
      {
        id: 'b018b96f-0f27-4327-8e06-ca0e4be11c37',
        name: 'name',
        year: 2000,
        artistId: 'b018b96f-0f27-4327-8e06-ca0e4be11c37',
      },
    ];
  }
  async create(dto: CreateAlbumDto) {
    const created: Album = {
      id: uuid.v4(),
      ...dto,
    };
    this.entities.push(created);
    return created;
  }
}
