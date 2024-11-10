import { Injectable } from '@nestjs/common';
import { FavEntities } from '../../entities/fav.entity';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}
  async getAllFavorites(): Promise<FavEntities> {
    const favArtists = await this.artistsService.getFavoriteArtists();
    const favAlbums = await this.albumsService.getFavoriteAlbums();
    const favTracks = await this.tracksService.getFavoriteTracks();

    return {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks,
    };
  }

  async addArtistToFavorites(id: string): Promise<void> {
    await this.artistsService.addFavoriteArtist(id);
  }

  async deleteArtistFromFavorites(id: string): Promise<void> {
    await this.artistsService.deleteFavoriteArtist(id);
  }

  async addAlbumToFavorites(id: string): Promise<void> {
    await this.albumsService.addFavoriteAlbum(id);
  }

  async deleteAlbumFromFavorites(id: string): Promise<void> {
    await this.albumsService.deleteFavoriteAlbum(id);
  }

  async addTrackToFavorites(id: string): Promise<void> {
    await this.tracksService.addFavoriteTrack(id);
  }

  async deleteTrackFromFavorites(id: string): Promise<void> {
    await this.tracksService.deleteFavoriteTrack(id);
  }
}
