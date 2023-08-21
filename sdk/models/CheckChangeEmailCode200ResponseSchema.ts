/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Timestamp } from './Timestamp';

export type CheckChangeEmailCode200ResponseSchema = {
    data: {
        type: 'CHANGE_EMAIL';
        expirationTimestamp: Timestamp;
        used: boolean;
        active: boolean;
        expired: boolean;
        valid: boolean;
        emailAlreadyExists: boolean;
        targetEmail: string;
    };
};

