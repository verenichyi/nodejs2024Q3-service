import Favorites from '../../../favorites/interfaces/favorite.interface';

export default class DBFavs implements Favorites {
  constructor(
    public artists: string[] = [],
    public albums: string[] = [],
    public tracks: string[] = [],
  ) {}

  async addArtist(id: string): Promise<void> {
    this.artists.push(id);
  }
  async addAlbum(id: string): Promise<void> {
    this.albums.push(id);
  }
  async addTrack(id: string): Promise<void> {
    this.tracks.push(id);
  }

  async deleteArtist(id: string): Promise<string> {
    const idx = this.artists.findIndex((entityId) => entityId === id);

    const deleted = this.artists[idx];
    this.artists.splice(idx, 1);
    return deleted;
  }

  async deleteAlbum(id: string): Promise<string> {
    const idx = this.albums.findIndex((entityId) => entityId === id);

    const deleted = this.albums[idx];
    this.albums.splice(idx, 1);
    return deleted;
  }

  async deleteTrack(id: string): Promise<string> {
    const idx = this.tracks.findIndex((entityId) => entityId === id);

    const deleted = this.tracks[idx];
    this.tracks.splice(idx, 1);
    return deleted;
  }
}
