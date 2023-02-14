import { getItemFromLocalStorage } from '../services/localStorage.service';
import { createFavoriteMovieCard } from './favoriteFilmCard';
import { LocalStorageKeys } from '../enums/localStorageKeys';
import { getMovieById } from '../helpers/apiHelper';

function favoriteMoviesList(): void {
    const favoriteFilmsContainer = document.getElementById(
        'favorite-movies'
    ) as HTMLElement;
    const moviesFromStorage: number[] = getItemFromLocalStorage(
        LocalStorageKeys.FavoriteMovies
    );

    moviesFromStorage.forEach(async (id: number) => {
        const favoriteMovieFromDb = await getMovieById(id);
        const newFavoriteMovieElement =
            createFavoriteMovieCard(favoriteMovieFromDb);
        favoriteFilmsContainer.appendChild(newFavoriteMovieElement);
    });
}

export { favoriteMoviesList };
