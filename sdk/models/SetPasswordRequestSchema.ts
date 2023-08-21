/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Password } from './Password';

export type SetPasswordRequestSchema = {
    handler: {
        userId: number;
    };
    password: Password;
};

