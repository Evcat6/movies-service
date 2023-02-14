import {
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getMoviesByQuery,
    getMoviesByEnpoint,
} from '../helpers/apiHelper';
import { removeAllChildrens } from '../helpers/domHelper';
import { APIEndoints } from '../enums/apiEndpoints';
import { SearchParams } from '../interfaces/searchParams.interface';
import { Movie } from '../interfaces/response.interface';
import { createFilmCard } from './filmCard';

function filterPanel(): void {
    const searchInput = document.getElementById('search') as HTMLInputElement;
    const searchButton = document.getElementById('submit') as HTMLButtonElement;
    const enterButtonKeyCode = 13;

    const buttons = document.getElementsByClassName('btn-outline-dark');
    const loadMoreButton = document.getElementById(
        'load-more'
    ) as HTMLButtonElement;
    const filmsContainer = document.getElementById(
        'film-container'
    ) as HTMLElement;

    const currentParams: SearchParams = {
        currentPage: 1,
        currentPath: APIEndoints.Popular,
        query: '',
    };

    searchButton.addEventListener('click', searchEventListener);
    document.addEventListener('keyup', keyUp);

    buttons[0].addEventListener('click', firstButtonEventListener);
    buttons[1].addEventListener('click', secondButtonEventListener);
    buttons[2].addEventListener('click', thirdButtonEventListener);

    loadMoreButton.addEventListener('click', loadMoreEventListener);

    function keyUp(e: KeyboardEvent): void {
        if (
            (document.activeElement as Element).id === 'search' &&
            e.keyCode === enterButtonKeyCode
        ) {
            searchEventListener();
        }
    }

    async function searchEventListener(): Promise<void> {
        if (searchInput.value.length < 3) return;
        currentParams.query = searchInput.value;
        currentParams.currentPath = APIEndoints.Search;
        const response = await getMoviesByQuery(
            currentParams.query,
            currentParams.currentPage
        );
        currentParams.currentPage = response.page;
        removeAllChildrens(filmsContainer);
        iterateMovies(response.results);
    }

    async function firstButtonEventListener(): Promise<void> {
        if (currentParams.currentPath === APIEndoints.Popular) return;
        currentParams.currentPath = APIEndoints.Popular;

        const response = await getPopularMovies(currentParams.currentPage);
        currentParams.currentPage = response.page;
        removeAllChildrens(filmsContainer);
        iterateMovies(response.results);
    }

    async function secondButtonEventListener(): Promise<void> {
        if (currentParams.currentPath === APIEndoints.Upcoming) return;
        currentParams.currentPath = APIEndoints.Upcoming;

        const response = await getUpcomingMovies(currentParams.currentPage);
        currentParams.currentPage = response.page;
        removeAllChildrens(filmsContainer);
        iterateMovies(response.results);
    }

    async function thirdButtonEventListener(): Promise<void> {
        if (currentParams.currentPath === APIEndoints.TopRated) return;
        currentParams.currentPath = APIEndoints.TopRated;

        const response = await getTopRatedMovies(currentParams.currentPage);
        currentParams.currentPage = response.page;
        removeAllChildrens(filmsContainer);
        iterateMovies(response.results);
    }

    async function loadMoreEventListener(): Promise<void> {
        if (currentParams.currentPath === APIEndoints.Search) {
            if (!currentParams.query) return;
            const response = await getMoviesByQuery(
                currentParams.query,
                currentParams.currentPage + 1
            );
            currentParams.currentPage = response.page;
            iterateMovies(response.results);
        }
        const response = await getMoviesByEnpoint(
            currentParams.currentPath,
            currentParams.currentPage + 1
        );
        currentParams.currentPage = response.page;
        iterateMovies(response.results);
    }
}

function iterateMovies(movies: Movie[]) {
    const filmsContainer = document.getElementById(
        'film-container'
    ) as HTMLElement;

    for (const item of movies) {
        const newMovie = createFilmCard(item);
        filmsContainer.appendChild(newMovie);
    }
}

export { filterPanel };
