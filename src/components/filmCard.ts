import { createElement, removeElementByDataKey } from '../helpers/domHelper';
import { Movie } from '../interfaces/response.interface';
import { getMovieById } from '../helpers/apiHelper';
import {
    setItemToLocalStorage,
    getItemFromLocalStorage,
} from '../services/localStorage.service';
import { createSvgHurt } from './hurtIcon';
import { createCardDescriptionBody } from './cardDescription';
import { createFavoriteMovieCard } from './favoriteFilmCard';
import { CardColors } from '../enums/cardColors.enum';
import { LocalStorageKeys } from '../enums/localStorageKeys.enum';
import { APILinks } from '../enums/apiLinks.enum';

const createFilmCard = ({
    poster_path,
    overview,
    release_date,
    id,
}: Movie): HTMLElement => {
    const cardContainer: HTMLElement = createElement({
        tagName: 'div',
        className: 'col-lg-3 col-md-4 col-12 p-2',
    });
    cardContainer.setAttribute('data-gen-key', id.toString());

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

    if (moviesFromStorage.includes(id)) {
        svgHurt.setAttribute('fill', CardColors.lightRed);
    }

    const svgHurtPath = svgHurt.children[0];
    svgHurtPath.addEventListener('click', (e) => svgHurtListener(e, id));

    cardShadow.appendChild(elementImage);
    cardShadow.appendChild(svgHurt);

    const cardBody = createCardDescriptionBody(overview, release_date);

    cardShadow.appendChild(cardBody);
    cardContainer.appendChild(cardShadow);
    return cardContainer;
};

const svgHurtListener = async (e: Event, id: number): Promise<void> => {
    const movie = await getMovieById(id);
    if (!movie) return;

    const pathElement = e.target as HTMLElement;
    const svgElement = pathElement.closest('svg') as SVGSVGElement;

    const favoriteFilmsContainer = document.getElementById(
        'favorite-movies'
    ) as HTMLElement;
    let moviesFromStorage: number[] = getItemFromLocalStorage(
        LocalStorageKeys.FavoriteMovies
    );

    if (!moviesFromStorage.includes(id)) {
        setItemToLocalStorage(LocalStorageKeys.FavoriteMovies, [
            ...moviesFromStorage,
            id,
        ]);
        svgElement.setAttribute('fill', CardColors.lightRed);

        const newFavoriteMovie = createFavoriteMovieCard(movie);
        favoriteFilmsContainer.appendChild(newFavoriteMovie);
    } else {
        moviesFromStorage = moviesFromStorage.filter((e: number) => e !== id);
        setItemToLocalStorage(
            LocalStorageKeys.FavoriteMovies,
            moviesFromStorage
        );
        svgElement.setAttribute('fill', CardColors.darkRed);
        removeElementByDataKey(id);
    }
};

export { createFilmCard };
