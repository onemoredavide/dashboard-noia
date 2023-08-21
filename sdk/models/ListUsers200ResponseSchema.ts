/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompleteUser } from './CompleteUser';
import type { NullablePaginator } from './NullablePaginator';
import type { Paginator } from './Paginator';

export type ListUsers200ResponseSchema = {
    data: Array<CompleteUser>;
    currentPaginator?: Paginator;
    nextPaginator?: NullablePaginator;
    currentFilters?: {
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
    filters?: Array<({
        id: 'id';
        label: string;
        schema: {
            type: 'number';
        };
    } | {
        id: 'firstname';
        label: string;
        schema: {
            type: 'string';
        };
    } | {
        id: 'lastname';
        label: string;
        schema: {
            type: 'string';
        };
    } | {
        id: 'email';
        label: string;
        schema: {
            type: 'string';
        };
    } | {
        id: 'admin';
        label: string;
        schema: {
            type: 'boolean';
        };
    } | {
        id: 'enabled';
        label: string;
        schema: {
            type: 'boolean';
        };
    } | {
        id: 'emailVerified';
        label: string;
        schema: {
            type: 'boolean';
        };
    } | {
        id: 'anonymized';
        label: string;
        schema: {
            type: 'boolean';
        };
    })>;
    currentSorters?: Array<{
        name: 'id' | 'firstname' | 'lastname' | 'email';
        order: 'ASC' | 'DESC';
    }>;
    sorters?: Array<'id' | 'firstname' | 'lastname' | 'email'>;
    count?: number;
};

