/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListingResponseFilters } from './ListingResponseFilters';
import type { ListingResponseSorters } from './ListingResponseSorters';
import type { NullablePaginator } from './NullablePaginator';

export type ListingSuccessResponse = {
    data: Array<Record<string, any>>;
    nextPaginator?: NullablePaginator;
    count?: number;
    filters?: ListingResponseFilters;
    sorters?: ListingResponseSorters;
};

