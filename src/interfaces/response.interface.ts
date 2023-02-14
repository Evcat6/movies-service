interface MovieApiResponse {
    page: number;
    results: Movie[] | unmappedMovie[];
    total_pages: number;
}

interface unmappedMovie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface Movie {
    backdrop_path: string | null;
    id: number;
    overview: string;
    poster_path: string | null;
    release_date: string;
    title: string;
}

export { MovieApiResponse, unmappedMovie, Movie };
