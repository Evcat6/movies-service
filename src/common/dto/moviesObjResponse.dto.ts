import { MovieEntity } from '../entities/movie.entity';
import { UnmappedMovie } from '../types/unmappedMovie.type';

type MovieApiResponseDto = {
  page: number;
  results: UnmappedMovie[];
  total_pages: number;
};

type MovieApiParsedResponseDto = {
  page: number;
  results: MovieEntity[];
  totalPages: number;
};

export { MovieApiParsedResponseDto,MovieApiResponseDto };
