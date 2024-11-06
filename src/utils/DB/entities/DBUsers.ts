import DBEntity from './DBEntity';
import UserEntity from '../../../users/interfaces/user.interface';
import * as uuid from 'uuid';

type CreateUserDTO = Omit<
  UserEntity,
  'id' | 'version' | 'createdAt' | 'updatedAt'
>;
type ChangeUserDTO = Partial<Omit<UserEntity, 'id'>>;

export default class DBUsers extends DBEntity<
  UserEntity,
  ChangeUserDTO,
  CreateUserDTO
> {
  constructor() {
    super();
    this.entities = [
      {
        id: 'id',
        login: 'login',
        password: 'password',
        version: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];
  }
  async create(dto: CreateUserDTO) {
    const created: UserEntity = {
      id: uuid.v4(),
      ...dto,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.entities.push(created);
    return created;
  }
}
