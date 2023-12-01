import { ENV } from '../common/config/env.config';
import { IRendererComponent } from '../common/interfaces/IRendererComponent.interface';
import { moviesService } from '../services/services';

class RandomMovieRenderer implements IRendererComponent {
  private randomMovieContainer = document.getElementById(
    'random-movie'
  ) as HTMLElement;
  private randomMovieTitle = document.getElementById(
    'random-movie-name'
  ) as HTMLElement;
  private randomMovieDescription = document.getElementById(
    'random-movie-description'
  ) as HTMLElement;

  private generateRandomNumber(min = 0, max = 100): number {
    const difference = max - min;

    let rand = Math.random();

    rand = Math.floor(rand * difference);

    rand += min;

    return rand;
  }

  public async render() {
    const movies = await moviesService.getPopular();

    const minRange = 0;
    const maxRange = movies.results.length;
    const randomMovieId = this.generateRandomNumber(minRange, maxRange);
    const movieById = movies.results[randomMovieId];
    this.randomMovieContainer.style.backgroundImage = `url(${ENV.API.IMAGES_URL}/${movieById.backdropPath})`;
    this.randomMovieContainer.style.backgroundSize = 'cover';
    this.randomMovieTitle.innerText = movieById.title;
    this.randomMovieDescription.innerText = movieById.overview;
  }
}

export { RandomMovieRenderer };
