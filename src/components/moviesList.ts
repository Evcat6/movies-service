import { MovieEntity } from '../common/entities/movie.entity';
import { IRendererComponent } from '../common/interfaces/IRendererComponent.interface';
import { moviesService } from '../services/services';
import { FilmCardComponent } from './filmCard';

class MoviesListRenderer implements IRendererComponent {
  private filmsContainer = document.getElementById(
    'film-container'
  ) as HTMLElement;

  public async render() {
    const moviesList = await moviesService.getPopular();

    moviesList.results.map((movie: MovieEntity) => {
      const newMovie = new FilmCardComponent(movie).build();
      this.filmsContainer.appendChild(newMovie);
    });
  }
}

export { MoviesListRenderer };
