/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Email } from './Email';
import type { SsoProvider } from './SsoProvider';
import type { Timestamp } from './Timestamp';
import type { UserLanguage } from './UserLanguage';

export type CompleteUser = {
    id: number;
    email: Email;
    firstname: string;
    lastname: string;
    emailVerified: boolean;
    enabled: boolean;
    birthDate: Timestamp;
    language: UserLanguage;
    mfaGoogle: boolean;
    mfaSMS: boolean;
    admin: boolean;
    anonymized: boolean;
    sso: {
        GOOGLE: Array<SsoProvider>;
        FACEBOOK: Array<SsoProvider>;
        TIK_TOK: Array<SsoProvider>;
        APPLE: Array<SsoProvider>;
    };
};

