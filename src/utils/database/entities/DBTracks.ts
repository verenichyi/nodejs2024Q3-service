import * as uuid from 'uuid';
import DBEntity from './DBEntity';
import { CreateTrackDto } from '../../../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../../../tracks/dto/update-track.dto';
import Track from '../../../tracks/interfaces/track.interface';

export default class DBTracks extends DBEntity<
  Track,
  UpdateTrackDto,
  CreateTrackDto
> {
  // constructor() {
  //   super();
  //   this.entities = [
  //     {
  //       id: 'b018b96f-0f27-4327-8e06-ca0e4be11c37',
  //       name: 'track',
  //       artistId: null,
  //       albumId: null,
  //       duration: 240,
  //     },
  //   ];
  // }
  async create(dto: CreateTrackDto) {
    const created: Track = {
      id: uuid.v4(),
      ...dto,
    };
    this.entities.push(created);
    return created;
  }
}
