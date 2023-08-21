/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BooleanDefaultFalse } from './BooleanDefaultFalse';
import type { Paginator } from './Paginator';

export type ListUsersRequestSchema = {
    paginator?: Paginator;
    getCurrentPaginator?: BooleanDefaultFalse;
    getNextPaginator?: BooleanDefaultFalse;
    getCurrentFilters?: BooleanDefaultFalse;
    getFilters?: BooleanDefaultFalse;
    filters?: {
        id?: Array<{
            operator: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'IN' | '!IN';
            values: Array<number>;
        }>;
        firstname?: Array<{
            operator: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'LIKE' | '!LIKE' | 'ILIKE' | '!ILIKE' | 'IN' | '!IN';
            values: Array<string>;
        }>;
        lastname?: Array<{
            operator: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'LIKE' | '!LIKE' | 'ILIKE' | '!ILIKE' | 'IN' | '!IN';
            values: Array<string>;
        }>;
        email?: Array<{
            operator: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'LIKE' | '!LIKE' | 'ILIKE' | '!ILIKE' | 'IN' | '!IN';
            values: Array<string>;
        }>;
        admin?: Array<{
            operator: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'IN' | '!IN';
            values: Array<boolean>;
        }>;
        enabled?: Array<{
            operator: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'IN' | '!IN';
            values: Array<boolean>;
        }>;
        emailVerified?: Array<{
            operator: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'IN' | '!IN';
            values: Array<boolean>;
        }>;
        anonymized?: Array<{
            operator: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'IN' | '!IN';
            values: Array<boolean>;
        }>;
    };
    getCurrentSorters?: BooleanDefaultFalse;
    getSorters?: BooleanDefaultFalse;
    sorters?: Array<{
        name: 'id' | 'firstname' | 'lastname' | 'email';
        order: 'ASC' | 'DESC';
    }>;
    search?: string;
    getCount?: BooleanDefaultFalse;
};

