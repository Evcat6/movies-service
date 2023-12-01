import { ENV } from '../common/config/env.config';
import { MovieEntity } from '../common/entities/movie.entity';
import { CardColor, StorageKey } from '../common/enums/enums';
import { IComponent } from '../common/interfaces/IComponent.interface';
import { storageService } from '../services/services';
import { AbstractComponent } from './abstract';
import { CardDescriptionComponent } from './cardDescription';
import { SVGHurtComponent } from './hurtIcon';

class FavoriteMovieCardComponent
  extends AbstractComponent
  implements IComponent
{
  constructor(private movie: MovieEntity) {
    super();
  }

  public build() {
    const cardContainer: HTMLElement = this.createElement({
      tagName: 'div',
      className: 'col-12 p-2',
    });
    cardContainer.setAttribute('data-key', this.movie.id.toString());

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

    const svgHurtPath = svgHurt.children[0];
    svgHurtPath.addEventListener('click', () =>
      this.svgFavoriteHurtListener(this.movie.id)
    );

    if (moviesFromStorage.includes(this.movie.id)) {
      svgHurt.setAttribute('fill', CardColor.lightRed);
    }

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

  private svgFavoriteHurtListener(id: number): void {
    const cardFromMainList = document.querySelector(
      `[data-gen-key="${id}"]`
    ) as Element;
    if (cardFromMainList) {
      const cardFromMainListFirstChild = cardFromMainList.children[0];
      for (let i = 0; i < cardFromMainListFirstChild.childElementCount; i++) {
        if (cardFromMainListFirstChild.children[i].tagName === 'svg') {
          cardFromMainListFirstChild.children[i].setAttribute(
            'fill',
            CardColor.darkRed
          );
        }
      }
    }

    let moviesFromStorage: number[] = storageService.get(
      StorageKey.FavoriteMovies
    );
    moviesFromStorage = moviesFromStorage.filter(
      (movieId: number) => movieId !== id
    );
    storageService.set(StorageKey.FavoriteMovies, moviesFromStorage);
    this.removeElementByDataKey(id);
  }
}

export { FavoriteMovieCardComponent };
