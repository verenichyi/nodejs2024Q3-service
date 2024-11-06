import { Global, Module } from '@nestjs/common';
import DB from './DB';

@Global()
@Module({
  providers: [DB],
  exports: [DB],
})
export class Database {}
