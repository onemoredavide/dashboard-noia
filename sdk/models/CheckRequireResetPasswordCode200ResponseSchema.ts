/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Timestamp } from './Timestamp';

export type CheckRequireResetPasswordCode200ResponseSchema = {
    data: {
        type: 'RESET_PASSWORD';
        expirationTimestamp: Timestamp;
        used: boolean;
        active: boolean;
        expired: boolean;
        valid: boolean;
        targetEmail: string;
    };
};

