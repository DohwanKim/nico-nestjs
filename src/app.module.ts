import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { MoviesService } from './movies/movies.service';
import { MovieController } from './movie/movie.controller';

@Module({
  imports: [MoviesModule],
  controllers: [AppController, MovieController],
  providers: [MoviesService],
})
export class AppModule {}
