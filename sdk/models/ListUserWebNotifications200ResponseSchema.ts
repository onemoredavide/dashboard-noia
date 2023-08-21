/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Notification } from './Notification';
import type { NullablePaginator } from './NullablePaginator';
import type { Paginator } from './Paginator';

export type ListUserWebNotifications200ResponseSchema = {
    data: Array<Notification>;
    currentPaginator?: Paginator;
    nextPaginator?: NullablePaginator;
    currentFilters?: {
        readTimestamp?: Array<{
            operator: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'LIKE' | '!LIKE' | 'ILIKE' | '!ILIKE' | 'IN' | '!IN';
            values: Array<string>;
        }>;
        read?: Array<{
            operator: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'IN' | '!IN';
            values: Array<boolean>;
        }>;
    };
    filters?: Array<({
        id: 'readTimestamp';
        label: string;
        schema: {
            type: 'string';
            format: 'date-time';
        };
    } | {
        id: 'read';
        label: string;
        schema: {
            type: 'boolean';
        };
    })>;
    currentSorters?: Array<{
        name: 'id' | 'title' | 'body' | 'userId';
        order: 'ASC' | 'DESC';
    }>;
    sorters?: Array<'id' | 'title' | 'body' | 'userId'>;
    count?: number;
};

