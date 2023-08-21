/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ListingRequestFilters } from './ListingRequestFilters';
import type { ListingRequestSorters } from './ListingRequestSorters';
import type { Paginator } from './Paginator';

export type ListingRequest = {
    paginator: Paginator;
    getFilters?: boolean;
    getSorters?: boolean;
    getCount?: boolean;
    filters?: ListingRequestFilters;
    sorters?: ListingRequestSorters;
    search?: string;
};

