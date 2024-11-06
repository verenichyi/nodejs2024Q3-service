import { Module } from '@nestjs/common';
import DB from './DB';

@Module({
  providers: [DB],
  exports: [DB],
})
export class Database {}
