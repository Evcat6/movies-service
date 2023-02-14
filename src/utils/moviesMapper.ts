import { unmappedMovie } from '../interfaces/response.interface';

const moviesMapper = (moviesArray: unmappedMovie[]): void => {
    for (let i = 0; i < moviesArray.length; i++) {
        movieMapper(moviesArray[i]);
    }
};

const movieMapper = (movie: unmappedMovie): void => {
    const necessaryPropArr: string[] = [
        'adult',
        'genre_ids',
        'original_language',
        'popularity',
        'original_title',
        'video',
        'vote_average',
        'vote_count',
    ];
    for (const [key] of Object.entries(movie)) {
        if (necessaryPropArr.includes(key)) {
            delete movie[key as keyof unmappedMovie];
        }
    }
};

export { movieMapper, moviesMapper };
