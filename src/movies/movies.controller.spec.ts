import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MovieController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = [
        {
          id: 1,
          title: 'Test Movie',
          genres: ['test'],
          year: 2000,
        },
      ];
      jest.spyOn(service, 'getAll').mockImplementation(() => result);

      expect(controller.getAll()).toEqual(result);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      const movieData = {
        id: 1,
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      };

      jest.spyOn(service, 'getOne').mockImplementation(() => movieData);
      expect(controller.getOne(1)).toEqual(movieData);
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const movieData = {
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      };

      jest.spyOn(service, 'create').mockImplementation(() => true);
      expect(controller.create(movieData)).toBe(true);
    });
  });

  describe('remove', () => {
    it('should delete a movie', () => {
      jest.spyOn(service, 'deleteOne').mockImplementation(() => true);
      expect(controller.remove(1)).toBe(true);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      const movieData = {
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      };

      jest.spyOn(service, 'update').mockImplementation(() => true);
      expect(controller.patch(1, movieData)).toBe(true);
    });
  });
});
