import { getPopularMovies } from '../helpers/apiHelper';
import { Movie } from '../interfaces/response.interface';
import { APILinks } from '../enums/apiLinks';

async function randomMovie(): Promise<void> {
    const randomMovieContainer = document.getElementById(
        'random-movie'
    ) as HTMLElement;
    const randomMovieTitle = document.getElementById(
        'random-movie-name'
    ) as HTMLElement;
    const randomMovieDescription = document.getElementById(
        'random-movie-description'
    ) as HTMLElement;

    const movies = await getPopularMovies();

    const minRange = 0;
    const maxRange = 20;
    const randomMovieId = generateRandomNumber(minRange, maxRange);
    const movieById: Movie = movies.results[randomMovieId];
    randomMovieContainer.style.backgroundImage = `url(${APILinks.API_IMAGES_URL}/${movieById.backdrop_path})`;
    randomMovieContainer.style.backgroundSize = 'cover';
    randomMovieTitle.innerText = movieById.title;
    randomMovieDescription.innerText = movieById.overview;
}

function generateRandomNumber(min = 0, max = 100): number {
    const difference = max - min;

    let rand = Math.random();

    rand = Math.floor(rand * difference);

    rand = rand + min;

    return rand;
}

export { randomMovie };
