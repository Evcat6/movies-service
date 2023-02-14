import { favoriteMoviesList } from './components/favoriteMoviesList';
import { moviesList } from './components/moviesList';
import { filterPanel } from './components/filterPanel';
import { randomMovie } from './components/randomMovie';

export async function render(): Promise<void> {
    filterPanel();

    randomMovie();
    moviesList();
    favoriteMoviesList();
}
