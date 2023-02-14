import { getPopularMovies } from '../helpers/apiHelper';
import { createFilmCard } from './filmCard';
import { Movie, MovieApiResponse } from '../interfaces/response.interface';

async function moviesList(): Promise<void> {
    const filmsContainer = document.getElementById(
        'film-container'
    ) as HTMLElement;
    const moviesList: MovieApiResponse = await getPopularMovies();

    moviesList.results.map((movie: Movie) => {
        const newMovie = createFilmCard(movie);
        filmsContainer.appendChild(newMovie);
    })
}

export { moviesList };
