import { APIEndoints } from '../enums/apiEndpoints.enum';

interface SearchParams {
    currentPage: number;
    currentPath: APIEndoints;
    query: string;
}

export { SearchParams };
