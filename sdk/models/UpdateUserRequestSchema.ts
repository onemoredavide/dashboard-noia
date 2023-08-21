/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UpdateUserFields } from './UpdateUserFields';

export type UpdateUserRequestSchema = {
    handler: {
        userId: number;
    };
    updates: UpdateUserFields;
};

