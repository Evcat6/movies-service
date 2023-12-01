import {
  MovieApiParsedResponseDto,
  MovieApiResponseDto,
} from '../common/dto/moviesObjResponse.dto';
import { MovieEntity } from '../common/entities/movie.entity';
import { APIEndpoint } from '../common/enums/apiEndpoint.enum';
import { HttpMethod } from '../common/enums/httpMethod.enum';
import { UnmappedMovie } from '../common/types/unmappedMovie.type';
import { Http } from './http.service';

class Movies {
  constructor(private http: Http, private baseUrl: string) {}

  public async getPopular(page = 1): Promise<MovieApiParsedResponseDto> {
    const response = await this.http.load(
      `${this.baseUrl}${APIEndpoint.Popular}`,
      {
        query: {
          page,
        },
        method: HttpMethod.GET,
      }
    );
    const {
      page: currentPage,
      results,
      total_pages,
    } = await response.json<MovieApiResponseDto>();
    const resultsMapped = results.map((movie: UnmappedMovie) => MovieEntity.parse(movie));
    return {
      page: currentPage,
      results: resultsMapped,
      totalPages: total_pages,
    };
  }

  public async getTopRated(page = 1): Promise<MovieApiParsedResponseDto> {
    const response = await this.http.load(
      `${this.baseUrl}${APIEndpoint.TopRated}`,
      {
        query: {
          page,
        },
        method: HttpMethod.GET,
      }
    );
    const {
      page: currentPage,
      results,
      total_pages,
    } = await response.json<MovieApiResponseDto>();
    const resultsMapped = results.map((movie: UnmappedMovie) => MovieEntity.parse(movie));
    return {
      page: currentPage,
      results: resultsMapped,
      totalPages: total_pages,
    };
  }

  public async getUpcoming(page = 1): Promise<MovieApiParsedResponseDto> {
    const response = await this.http.load(
      `${this.baseUrl}${APIEndpoint.Upcoming}`,
      {
        query: {
          page,
        },
        method: HttpMethod.GET,
      }
    );
    const {
      page: currentPage,
      results,
      total_pages,
    } = await response.json<MovieApiResponseDto>();
    const resultsMapped = results.map((movie: UnmappedMovie) => MovieEntity.parse(movie));
    return {
      page: currentPage,
      results: resultsMapped,
      totalPages: total_pages,
    };
  }

  public async getById(id: number): Promise<MovieEntity> {
    const response = await this.http.load(
      `${this.baseUrl}${APIEndpoint.Movie}/${id}`,
      {
        method: HttpMethod.GET,
      }
    );
    const movieById = await response.json<UnmappedMovie>();
    const parsedMovieById = MovieEntity.parse(movieById);
    return parsedMovieById;
  }

  public async getByQuery(
    query: string,
    page: number
  ): Promise<MovieApiParsedResponseDto> {
    const response = await this.http.load(
      `${this.baseUrl}${APIEndpoint.Search}`,
      {
        query: {
          page,
          query,
        },
        method: HttpMethod.GET,
      }
    );
    const {
      page: currentPage,
      results,
      total_pages,
    } = await response.json<MovieApiResponseDto>();
    const resultsMapped = results.map((movie: UnmappedMovie) => MovieEntity.parse(movie));
    return {
      page: currentPage,
      results: resultsMapped,
      totalPages: total_pages,
    };
  }

  public async getByEndpoint(
    endpoint: string,
    page: number
  ): Promise<MovieApiParsedResponseDto> {
    const response = await this.http.load(`${this.baseUrl}${endpoint}`, {
      query: {
        page,
      },
      method: HttpMethod.GET,
    });
    const {
      page: currentPage,
      results,
      total_pages,
    } = await response.json<MovieApiResponseDto>();
    const resultsMapped = results.map((movie: UnmappedMovie) => MovieEntity.parse(movie));
    return {
      page: currentPage,
      results: resultsMapped,
      totalPages: total_pages,
    };
  }
}

export { Movies };
