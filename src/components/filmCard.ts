import { ENV } from '../common/config/env.config';
import { MovieEntity } from '../common/entities/movie.entity';
import { CardColor } from '../common/enums/cardColor.enum';
import { StorageKey } from '../common/enums/storageKey.enum';
import { moviesService, storageService } from '../services/services';
import { AbstractComponent } from './abstract';
import { CardDescriptionComponent } from './cardDescription';
import { FavoriteMovieCardComponent } from './favoriteFilmCard';
import { SVGHurtComponent } from './hurtIcon';

class FilmCardComponent extends AbstractComponent {
  constructor(private movie: MovieEntity) {
    super();
  }

  public build(): HTMLElement {
    const cardContainer: HTMLElement = this.createElement({
      tagName: 'div',
      className: 'col-lg-3 col-md-4 col-12 p-2',
    });

    cardContainer.setAttribute('data-gen-key', this.movie.id.toString());

    const cardShadow: HTMLElement = this.createElement({
      tagName: 'div',
      className: 'card shadow-sm',
    });

    const photoUrl = this.movie.posterPath
      ? `${ENV.API.IMAGES_URL}/${this.movie.posterPath}`
      : ENV.API.PHOTO_FILLER;

    const elementImage: HTMLElement = this.createElement({
      tagName: 'img',
      attributes: {
        src: photoUrl,
      },
    });

    const moviesFromStorage: number[] = storageService.get(
      StorageKey.FavoriteMovies
    );

    const svgHurt: SVGSVGElement = new SVGHurtComponent(
      CardColor.darkRed
    ).build();

    if (moviesFromStorage.includes(this.movie.id)) {
      svgHurt.setAttribute('fill', CardColor.lightRed);
    }

    const svgHurtPath = svgHurt.children[0];
    svgHurtPath.addEventListener('click', (e) =>
      this.svgHurtListener(e, this.movie.id)
    );

    cardShadow.appendChild(elementImage);
    cardShadow.appendChild(svgHurt);

    const cardBody = new CardDescriptionComponent(
      this.movie.overview,
      this.movie.releaseDate
    ).build();

    cardShadow.appendChild(cardBody);
    cardContainer.appendChild(cardShadow);
    return cardContainer;
  }

  private async svgHurtListener(e: Event, id: number): Promise<void> {
    const movie = await moviesService.getById(this.movie.id);
    if (!movie) return;

    const pathElement = e.target as HTMLElement;
    const svgElement = pathElement.closest('svg') as SVGSVGElement;

    const favoriteFilmsContainer = document.getElementById(
      'favorite-movies'
    ) as HTMLElement;
    const moviesFromStorage: number[] = storageService.get(
      StorageKey.FavoriteMovies
    );

    if (!moviesFromStorage.includes(id)) {
      svgElement.setAttribute('fill', CardColor.lightRed);

      storageService.set(StorageKey.FavoriteMovies, [...moviesFromStorage, id]);

      const newFavoriteMovie = new FavoriteMovieCardComponent(movie).build();
      favoriteFilmsContainer.appendChild(newFavoriteMovie);
    } else {
      svgElement.setAttribute('fill', CardColor.darkRed);
      const filteredMoviesFromStorage = moviesFromStorage.filter(
        (e: number) => e !== id
      );
      storageService.set(StorageKey.FavoriteMovies, filteredMoviesFromStorage);
      this.removeElementByDataKey(id);
    }
  }
}

export { FilmCardComponent };
