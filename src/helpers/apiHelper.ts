import { APIEndoints } from '../enums/apiEndpoints.enum';
import {
    MovieApiResponse,
    Movie,
    unmappedMovie,
} from '../interfaces/response.interface';
import { APILinks } from '../enums/apiLinks.enum';
import { APIMethods } from '../enums/apiMethods.enum';
import { movieMapper, moviesMapper } from '../utils/moviesMapper';

const API_KEY = '6a6891ea94e015aee4047d70ea4f4006';

const apiRequest = async (
    endpoint: string,
    queries = {},
    method = APIMethods.GET
) => {
    try {
        const apiConfig: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            mode: 'cors',
            cache: 'no-cache',
        };
        const urlQuery: URLSearchParams = new URLSearchParams({
            ...queries,
            api_key: API_KEY as string,
        });
        const request: Response = await fetch(
            `${APILinks.API_CONNECT_URL}${endpoint}?${urlQuery}`,
            apiConfig
        );
        const json = await request.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};

const getPopularMovies = async (page = 1): Promise<MovieApiResponse> => {
    const endpoint = APIEndoints.Popular;
    const queries = {
        page,
    };
    const popularMovies: MovieApiResponse = await apiRequest(endpoint, queries);
    const unmappedPopularMovies = popularMovies.results as unmappedMovie[];
    moviesMapper(unmappedPopularMovies);
    return popularMovies;
};

const getTopRatedMovies = async (page = 1): Promise<MovieApiResponse> => {
    const endpoint = APIEndoints.TopRated;
    const queries = {
        page,
    };
    const topRatedMovies: MovieApiResponse = await apiRequest(
        endpoint,
        queries
    );
    const unmappedTopRatedMovies = topRatedMovies.results as unmappedMovie[];
    moviesMapper(unmappedTopRatedMovies);
    return topRatedMovies;
};

const getUpcomingMovies = async (page = 1): Promise<MovieApiResponse> => {
    const endpoint = APIEndoints.Upcoming;
    const queries = {
        page,
    };
    const topUpcomingMovies: MovieApiResponse = await apiRequest(
        endpoint,
        queries
    );
    const unmappedMovies = topUpcomingMovies.results as unmappedMovie[];
    moviesMapper(unmappedMovies);
    return topUpcomingMovies;
};

const getMovieById = async (id: number): Promise<Movie> => {
    const endpoint = `${APIEndoints.Movie}/${id}`;
    const movieById: unmappedMovie = await apiRequest(endpoint);
    movieMapper(movieById);
    return movieById;
};

const getMoviesByQuery = async (
    query: string,
    page: number
): Promise<MovieApiResponse> => {
    const endpoint = APIEndoints.Search;
    const queries = {
        page,
        query,
    };
    const moviesByQuery: MovieApiResponse = await apiRequest(endpoint, queries);
    const unmappedMovies = moviesByQuery.results as unmappedMovie[];
    moviesMapper(unmappedMovies);
    return moviesByQuery;
};

const getMoviesByEnpoint = async (
    endpoint: string,
    page: number
): Promise<MovieApiResponse> => {
    const queries = {
        page,
    };
    const moviesByEnpoint: MovieApiResponse = await apiRequest(
        endpoint,
        queries
    );
    moviesMapper(moviesByEnpoint.results as unmappedMovie[]);
    return moviesByEnpoint;
};

export {
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getMovieById,
    getMoviesByQuery,
    getMoviesByEnpoint,
};
