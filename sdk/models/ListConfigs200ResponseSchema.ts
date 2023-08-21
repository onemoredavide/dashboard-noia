/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Config } from './Config';
import type { NullablePaginator } from './NullablePaginator';

export type ListConfigs200ResponseSchema = {
    data: Array<Config>;
    nextPaginator: NullablePaginator;
    totalCount: number;
};

