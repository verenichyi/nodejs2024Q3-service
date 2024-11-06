import { forwardRef, Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [forwardRef(() => TracksModule), forwardRef(() => FavoritesModule)],
  exports: [AlbumsService],
})
export class AlbumsModule {}
