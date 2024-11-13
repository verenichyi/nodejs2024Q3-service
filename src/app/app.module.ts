import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../modules/users/users.module';
import { ArtistsModule } from '../modules/artists/artists.module';
import { TracksModule } from '../modules/tracks/tracks.module';
import { AlbumsModule } from '../modules/albums/albums.module';
import { FavoritesModule } from '../modules/favorites/favorites.module';
import { typeOrmAsyncConfig } from '../database/typeorm-config';
import { LoggingModule } from '../logging/logging.module';
import { LoggingMiddleware } from '../logging/logging.middleware';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    LoggingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
