/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BooleanDefaultFalse } from './BooleanDefaultFalse';
import type { Paginator } from './Paginator';

export type ListUserWebNotificationsRequestSchema = {
    handler: {
        userId: number;
    };
    paginator?: Paginator;
    getCurrentPaginator?: BooleanDefaultFalse;
    getNextPaginator?: BooleanDefaultFalse;
    getCurrentFilters?: BooleanDefaultFalse;
    getFilters?: BooleanDefaultFalse;
    filters?: {
        readTimestamp?: Array<{
            operator: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'LIKE' | '!LIKE' | 'ILIKE' | '!ILIKE' | 'IN' | '!IN';
            values: Array<string>;
        }>;
        read?: Array<{
            operator: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'IN' | '!IN';
            values: Array<boolean>;
        }>;
    };
    getCurrentSorters?: BooleanDefaultFalse;
    getSorters?: BooleanDefaultFalse;
    sorters?: Array<{
        name: 'id' | 'title' | 'body' | 'userId';
        order: 'ASC' | 'DESC';
    }>;
    search?: string;
    getCount?: BooleanDefaultFalse;
};

