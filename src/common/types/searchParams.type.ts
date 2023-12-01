import { APIEndpoint } from '../enums/enums';

type SearchParams = {
  currentPage: number;
  currentPath: APIEndpoint;
  query: string;
};

export { SearchParams };
