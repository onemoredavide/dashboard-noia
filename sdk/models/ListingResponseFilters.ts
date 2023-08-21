/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ListingResponseFilters = Array<{
    id: string;
    label: string;
    schema: Record<string, any>;
    values?: Array<{
        label: string;
        id: string;
    }>;
}>;
