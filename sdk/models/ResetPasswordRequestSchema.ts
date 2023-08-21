/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Password } from './Password';

export type ResetPasswordRequestSchema = {
    password: Password;
    code: string;
};

