import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { modules } from './modules';

@Module({
  imports: [...modules],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
