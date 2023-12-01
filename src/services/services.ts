import { ENV } from '../common/config/env.config';
import { Http } from './http.service';
import { Movies } from './movies.service';
import { Storage } from './storage.service';

const storageService = new Storage(localStorage);
const httpService = new Http();
const moviesService = new Movies(httpService, `${ENV.APP.URL}/api/movies`);

export { moviesService,storageService };
