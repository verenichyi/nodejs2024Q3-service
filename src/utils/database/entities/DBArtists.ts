import * as uuid from 'uuid';
import DBEntity from './DBEntity';
import { UpdateArtistDto } from '../../../artists/dto/update-artist.dto';
import { CreateArtistDto } from '../../../artists/dto/create-artist.dto';
import Artist from '../../../artists/interfaces/artist.interface';

export default class DBArtists extends DBEntity<
  Artist,
  UpdateArtistDto,
  CreateArtistDto
> {
  // constructor() {
  //   super();
  //   this.entities = [
  //     {
  //       id: 'b018b96f-0f27-4327-8e06-ca0e4be11c37',
  //       name: 'name',
  //       grammy: false,
  //     },
  //   ];
  // }
  async create(dto: CreateArtistDto) {
    const created: Artist = {
      id: uuid.v4(),
      ...dto,
    };
    this.entities.push(created);
    return created;
  }
}
