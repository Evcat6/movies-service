import { createElement, removeElementByDataKey } from '../helpers/domHelper';
import { Movie } from '../interfaces/response.interface';
import { createSvgHurt } from './hurtIcon';
import {
    getItemFromLocalStorage,
    setItemToLocalStorage,
} from '../services/localStorage.service';
import { createCardDescriptionBody } from './cardDescription';
import { CardColors } from '../enums/cardColors';
import { LocalStorageKeys } from '../enums/localStorageKeys';
import { APILinks } from '../enums/apiLinks';

function createFavoriteMovieCard({
    poster_path,
    overview,
    release_date,
    id,
}: Movie) {
    const cardContainer: HTMLElement = createElement({
        tagName: 'div',
        className: 'col-12 p-2',
    });
    cardContainer.setAttribute('data-key', id.toString());

    const cardShadow: HTMLElement = createElement({
        tagName: 'div',
        className: 'card shadow-sm',
    });

    const photoUrl = poster_path
        ? `${APILinks.API_IMAGES_URL}/${poster_path}`
        : APILinks.API_PHOTO_FILLER;

    const elementImage: HTMLElement = createElement({
        tagName: 'img',
        attributes: {
            src: photoUrl,
        },
    });

    const moviesFromStorage: number[] = getItemFromLocalStorage(
        LocalStorageKeys.FavoriteMovies
    );

    const svgHurt: SVGSVGElement = createSvgHurt(CardColors.darkRed);

    svgHurt.addEventListener('click', () => svgFavoriteHurtListener(id));

    if (moviesFromStorage.includes(id)) {
        svgHurt.setAttribute('fill', CardColors.lightRed);
    }

    cardShadow.appendChild(elementImage);
    cardShadow.appendChild(svgHurt);

    const cardBody = createCardDescriptionBody(overview, release_date);

    cardShadow.appendChild(cardBody);
    cardContainer.appendChild(cardShadow);
    return cardContainer;
}

function svgFavoriteHurtListener(id: number): void {
    const cardFromMainList = document.querySelector(
        `[data-gen-key="${id}"]`
    ) as Element;
    const cardFromMainListFirstChild = cardFromMainList.children[0];
    for (let i = 0; i < cardFromMainListFirstChild.childElementCount; i++) {
        if (cardFromMainListFirstChild.children[i].tagName === 'IMG') {
            cardFromMainListFirstChild.children[i].setAttribute(
                'fill',
                CardColors.darkRed
            );
        }
    }

    let moviesFromStorage: number[] = getItemFromLocalStorage(
        LocalStorageKeys.FavoriteMovies
    );
    moviesFromStorage = moviesFromStorage.filter(
        (movieId: number) => movieId !== id
    );
    setItemToLocalStorage(LocalStorageKeys.FavoriteMovies, moviesFromStorage);
    removeElementByDataKey(id);
}

export { createFavoriteMovieCard };
