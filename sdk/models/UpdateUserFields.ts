/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Timestamp } from './Timestamp';
import type { UserLanguage } from './UserLanguage';

export type UpdateUserFields = {
    firstname?: string;
    language?: UserLanguage;
    lastname?: string;
    birthDate?: Timestamp;
};

