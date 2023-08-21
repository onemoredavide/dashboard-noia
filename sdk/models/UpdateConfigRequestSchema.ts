/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Any } from './Any';
import type { String } from './String';

export type UpdateConfigRequestSchema = {
    key: String;
    updates: {
        description?: String;
        value?: Any;
    };
};

