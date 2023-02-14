import { APIEndoints } from '../enums/apiEndpoints';

interface SearchParams {
    currentPage: number;
    currentPath: APIEndoints;
    query: string;
}

export { SearchParams };
