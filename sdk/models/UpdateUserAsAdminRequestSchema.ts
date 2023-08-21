/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Timestamp } from './Timestamp';
import type { UserLanguage } from './UserLanguage';

export type UpdateUserAsAdminRequestSchema = {
    handler: {
        userId: number;
    };
    updates: {
        firstname?: string;
        language?: UserLanguage;
        lastname?: string;
        birthDate?: Timestamp;
        admin?: boolean;
        enabled?: boolean;
    };
};

