/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Timestamp } from './Timestamp';

export type CheckConfirmEmailCode200ResponseSchema = {
    data: {
        type: 'CONFIRM_EMAIL';
        expirationTimestamp: Timestamp;
        used: boolean;
        active: boolean;
        expired: boolean;
        valid: boolean;
    };
};

