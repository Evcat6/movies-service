import { APIEndoints } from '../enums/apiEndpoints';
import { MovieApiResponse, Movie } from '../interfaces/response.interface';
import { APILinks } from '../enums/apiLinks';
import { APIMethods } from '../enums/apiMethods';

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
    return topUpcomingMovies;
};

const getMovieById = async (id: number): Promise<Movie> => {
    const endpoint = `${APIEndoints.Movie}/${id}`;
    const movieById: Movie = await apiRequest(endpoint);
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
    const movieByQuery: MovieApiResponse = await apiRequest(endpoint, queries);
    return movieByQuery;
};

const getMoviesByEnpoint = async (
    endpoint: string,
    page: number
): Promise<MovieApiResponse> => {
    const queries = {
        page,
    };
    const movieByEnpoint: MovieApiResponse = await apiRequest(
        endpoint,
        queries
    );
    return movieByEnpoint;
};

export {
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getMovieById,
    getMoviesByQuery,
    getMoviesByEnpoint,
};
