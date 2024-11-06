import { forwardRef, Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [forwardRef(() => FavoritesModule)],
  exports: [TracksService],
})
export class TracksModule {}
