import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieEntity } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private moviesRepository: Repository<MovieEntity>,
  ) {}

  async getAll(): Promise<MovieEntity[]> {
    return await this.moviesRepository.find();
  }

  async getOne(id: number): Promise<MovieEntity> {
    const movie = await this.moviesRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`Movie id ${id} not found`);
    }

    return movie;
  }

  async deleteOne(id: number) {
    const result = await this.moviesRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Movie id ${id} not found`);
    }

    return true;
  }

  create(movieData: CreateMovieDto) {
    const movie: MovieEntity = new MovieEntity();

    movie.title = movieData.title;
    movie.year = movieData.year;
    movie.genres = movieData.genres;

    return this.moviesRepository.save(movie);
  }

  async update(id: number, updateData: UpdateMovieDto) {
    const target = await this.getOne(id);
    const updated = { ...target, ...updateData };

    await this.moviesRepository.save(updated);
    return true;
  }
}
