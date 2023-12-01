import { MovieEntity } from '../common/entities/movie.entity';
import { APIEndpoint } from '../common/enums/apiEndpoint.enum';
import { SearchParams } from '../common/types/searchParams.type';
import { moviesService } from '../services/services';
import { AbstractComponent } from './abstract';
import { FilmCardComponent } from './filmCard';

class FilterPanelRenderer extends AbstractComponent {
  private searchInput = document.getElementById('search') as HTMLInputElement;
  private searchButton = document.getElementById('submit') as HTMLButtonElement;

  private popularButton = document.querySelector(
    '[for="popular"]'
  ) as HTMLLabelElement;

  private upcomingButton = document.querySelector(
    '[for="upcoming"]'
  ) as HTMLLabelElement;
  private topRatedButton = document.querySelector(
    '[for="top_rated"]'
  ) as HTMLLabelElement;

  private loadMoreButton = document.getElementById(
    'load-more'
  ) as HTMLButtonElement;

  private filmsContainer = document.getElementById(
    'film-container'
  ) as HTMLElement;

  private currentParams: SearchParams = {
    currentPage: 1,
    currentPath: APIEndpoint.Popular,
    query: '',
  };

  public render() {
    this.searchButton.addEventListener(
      'click',
      this.searchEventListener.bind(this)
    );
    document.addEventListener('keyup', this.keyUp);

    this.popularButton.addEventListener(
      'click',
      this.firstButtonEventListener.bind(this)
    );
    this.upcomingButton.addEventListener(
      'click',
      this.secondButtonEventListener.bind(this)
    );
    this.topRatedButton.addEventListener(
      'click',
      this.thirdButtonEventListener.bind(this)
    );

    this.loadMoreButton.addEventListener(
      'click',
      this.loadMoreEventListener.bind(this)
    );
  }

  private async searchEventListener(): Promise<void> {
    if (this.searchInput.value.length < 3) return;
    this.currentParams.query = this.searchInput.value;
    this.currentParams.currentPath = APIEndpoint.Search;
    const response = await moviesService.getByQuery(
      this.currentParams.query,
      this.currentParams.currentPage
    );
    this.currentParams.currentPage = response.page;
    this.removeAllChildren(this.filmsContainer);
    this.iterateMainPageMovies(response.results);
  }

  private keyUp(e: KeyboardEvent): void {
    if (
      (document.activeElement as Element).id === 'search' &&
      e.key === 'Enter'
    ) {
      this.searchEventListener();
    }
  }

  private async firstButtonEventListener(): Promise<void> {
    if (this.currentParams.currentPath === APIEndpoint.Popular) return;
    this.currentParams.currentPath = APIEndpoint.Popular;

    const response = await moviesService.getPopular(
      this.currentParams.currentPage
    );
    this.currentParams.currentPage = response.page;
    this.removeAllChildren(this.filmsContainer);
    this.iterateMainPageMovies(response.results);
  }

  private async secondButtonEventListener(): Promise<void> {
    if (this.currentParams.currentPath === APIEndpoint.Upcoming) return;
    this.currentParams.currentPath = APIEndpoint.Upcoming;

    const response = await moviesService.getUpcoming(
      this.currentParams.currentPage
    );
    this.currentParams.currentPage = response.page;
    this.removeAllChildren(this.filmsContainer);
    this.iterateMainPageMovies(response.results);
  }

  private async thirdButtonEventListener(): Promise<void> {
    if (this.currentParams.currentPath === APIEndpoint.TopRated) return;
    this.currentParams.currentPath = APIEndpoint.TopRated;

    const response = await moviesService.getTopRated(
      this.currentParams.currentPage
    );
    this.currentParams.currentPage = response.page;
    this.removeAllChildren(this.filmsContainer);
    this.iterateMainPageMovies(response.results);
  }

  private async loadMoreEventListener(): Promise<void> {
    if (this.currentParams.currentPath === APIEndpoint.Search) {
      if (!this.currentParams.query) return;
      const response = await moviesService.getByQuery(
        this.currentParams.query,
        this.currentParams.currentPage + 1
      );
      this.currentParams.currentPage = response.page;
      this.iterateMainPageMovies(response.results);
    }
    const response = await moviesService.getByEndpoint(
      this.currentParams.currentPath,
      this.currentParams.currentPage + 1
    );
    this.currentParams.currentPage = response.page;
    this.iterateMainPageMovies(response.results);
  }

  private iterateMainPageMovies(movies: MovieEntity[]): void {
    const filmsContainer = document.getElementById(
      'film-container'
    ) as HTMLElement;

    movies.map((movie: MovieEntity) => {
      const newMovie = new FilmCardComponent(movie).build();
      filmsContainer.appendChild(newMovie);
    });
  }
}

export { FilterPanelRenderer };
