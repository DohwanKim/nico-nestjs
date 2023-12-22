import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private readonly movies: Repository<Movie>,
  ) {}

  getAll(): Promise<Movie[]> {
    return this.movies.find();
  }

  getOne(id: number): Promise<Movie> {
    const movie = this.movies.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie id ${id} not found`);
    }

    return movie;
  }

  deleteOne(id: number) {
    try {
      this.getOne(id).then((movie) => this.movies.delete(movie.id));
      return true;
    } catch (e) {
      return false;
    }
  }

  create(movieData: CreateMovieDto) {
    const movie: Movie = new Movie();

    movie.title = movieData.title;
    movie.year = movieData.year;
    movie.genres = movieData.genres;

    return this.movies.save(movie);
  }

  update(id: number, updateData: UpdateMovieDto) {
    this.getOne(id).then((movie) => {
      movie.title = updateData.title;
      movie.year = updateData.year;
      movie.genres = updateData.genres;
    });
    return true;
  }
}
