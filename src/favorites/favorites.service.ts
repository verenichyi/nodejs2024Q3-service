import { Injectable } from '@nestjs/common';
import Database from '../utils/database/database';
import FavoritesResponse from './interfaces/favorites-response.interface';
import Album from '../albums/interfaces/album.interface';
import Track from '../tracks/interfaces/track.interface';
import Artist from '../artists/interfaces/artist.interface';

@Injectable()
export class FavoritesService {
  constructor(private database: Database) {}
  async getAllFavorites(): Promise<FavoritesResponse> {
    const favArtists = await this.getFavoriteArtists();
    const favAlbums = await this.getFavoriteAlbums();
    const favTracks = await this.getFavoriteTracks();

    return {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks,
    };
  }
  private async getFavoriteArtists(): Promise<Artist[]> {
    const favArtistsIds = this.getFavoriteArtistsIds();

    return Promise.all(
      favArtistsIds.map(async (id) => {
        return await this.database.artists.findOne({
          key: 'id',
          equals: id,
        });
      }),
    );
  }

  private async getFavoriteAlbums(): Promise<Album[]> {
    const favAlbumsIds = this.getFavoriteAlbumsIds();

    return Promise.all(
      favAlbumsIds.map(async (id) => {
        return await this.database.albums.findOne({
          key: 'id',
          equals: id,
        });
      }),
    );
  }

  private async getFavoriteTracks(): Promise<Track[]> {
    const favTracksIds = this.getFavoriteTracksIds();

    return Promise.all(
      favTracksIds.map(async (id) => {
        return await this.database.tracks.findOne({
          key: 'id',
          equals: id,
        });
      }),
    );
  }

  getFavoriteArtistsIds(): string[] {
    return this.database.favs.artists;
  }

  getFavoriteAlbumsIds(): string[] {
    return this.database.favs.albums;
  }

  getFavoriteTracksIds(): string[] {
    return this.database.favs.tracks;
  }

  async addArtistToFavorites(id: string): Promise<void> {
    await this.database.favs.addArtist(id);
  }

  async deleteArtistFromFavorites(id: string): Promise<void> {
    await this.database.favs.deleteArtist(id);
  }

  async addAlbumToFavorites(id: string): Promise<void> {
    await this.database.favs.addAlbum(id);
  }

  async deleteAlbumFromFavorites(id: string): Promise<void> {
    await this.database.favs.deleteAlbum(id);
  }

  async addTrackToFavorites(id: string): Promise<void> {
    await this.database.favs.addTrack(id);
  }

  async deleteTrackFromFavorites(id: string): Promise<void> {
    await this.database.favs.deleteTrack(id);
  }
}
