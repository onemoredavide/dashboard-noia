/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AllowedURLPrefixes } from './AllowedURLPrefixes';
import type { Email } from './Email';
import type { Password } from './Password';
import type { UserLanguage } from './UserLanguage';
import type { WebsitePath } from './WebsitePath';

export type SignupRequestSchema = {
    email: Email;
    firstname: string;
    lastname: string;
    password: Password;
    language: UserLanguage;
    urlPrefix: AllowedURLPrefixes;
    path: WebsitePath;
};

