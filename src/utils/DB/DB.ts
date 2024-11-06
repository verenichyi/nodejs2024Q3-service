import { Injectable } from '@nestjs/common';
import * as lodash from 'lodash';
import DBUsers from './entities/DBUsers';
import DBTracks from './entities/DBTracks';
import DBArtists from './entities/DBArtists';
import DBAlbums from './entities/DBAlbums';
import DBFavs from './entities/DBFavs';

@Injectable()
export default class DB {
  users = new DBUsers();
  tracks = new DBTracks();
  artists = new DBArtists();
  albums = new DBAlbums();
  favs = new DBFavs();

  constructor() {
    const deepCopyResultTrap: ProxyHandler<any> = {
      get: (target, prop) => {
        if (typeof target[prop] === 'function') {
          return (...args: any[]) => {
            const result = target[prop](...args);
            if (result instanceof Promise) {
              return result.then((v) => lodash.cloneDeep(v));
            }
            return lodash.cloneDeep(result);
          };
        } else {
          return target[prop];
        }
      },
    };
    for (const [k, v] of Object.entries(this)) {
      this[k as keyof typeof this] = new Proxy(v, deepCopyResultTrap);
    }
  }
}
