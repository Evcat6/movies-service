import { getPopularMovies } from '../helpers/apiHelper';
import { createFilmCard } from './filmCard';
import { MovieApiResponse } from '../interfaces/response.interface';

async function moviesList() {
    const filmsContainer = document.getElementById(
        'film-container'
    ) as HTMLElement;
    const moviesList: MovieApiResponse = await getPopularMovies();

    for (const item of moviesList.results) {
        const newMovie = createFilmCard(item);
        filmsContainer.appendChild(newMovie);
    }
}

export { moviesList };
