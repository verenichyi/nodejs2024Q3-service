import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { Database } from '../utils/DB/database.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    Database,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
  ],
})
export class AppModule {}
