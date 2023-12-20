import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [MoviesService],
})
export class AppModule {}
