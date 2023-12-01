import { StorageKey } from '../common/enums/storageKey.enum';
import { moviesService, storageService } from '../services/services';
import { FavoriteMovieCardComponent } from './favoriteFilmCard';

class FavoriteMoviesListRenderer {
  private favoriteFilmsContainer = document.getElementById(
    'favorite-movies'
  ) as HTMLElement;

  public render() {
    const moviesFromStorage: number[] = storageService.get(
      StorageKey.FavoriteMovies
    );

    moviesFromStorage.forEach(async (id: number) => {
      const favoriteMovieFromDb = await moviesService.getById(id);
      const newFavoriteMovieElement = new FavoriteMovieCardComponent(
        favoriteMovieFromDb
      ).build();
      this.favoriteFilmsContainer.appendChild(newFavoriteMovieElement);
    });
  }
}

export { FavoriteMoviesListRenderer };
