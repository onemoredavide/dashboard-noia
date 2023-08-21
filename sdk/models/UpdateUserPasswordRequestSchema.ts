/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Password } from './Password';

export type UpdateUserPasswordRequestSchema = {
    handler: {
        userId: number;
    };
    newPassword: Password;
    oldPassword: string;
    mfaCode: string;
};

