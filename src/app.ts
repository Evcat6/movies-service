import { IRendererComponent } from './common/interfaces/IRendererComponent.interface';
import { FavoriteMoviesListRenderer } from './components/favoriteMoviesList';
import { FilterPanelRenderer } from './components/filterPanel';
import { MoviesListRenderer } from './components/moviesList';
import { RandomMovieRenderer } from './components/randomMovie';

class App implements IRendererComponent {
  public async render() {
    new FilterPanelRenderer().render();

    new FavoriteMoviesListRenderer().render();
    await new RandomMovieRenderer().render();
    await new MoviesListRenderer().render();
  }
}

export { App };
