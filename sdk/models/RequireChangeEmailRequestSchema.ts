/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AllowedURLPrefixes } from './AllowedURLPrefixes';
import type { Email } from './Email';
import type { Password } from './Password';
import type { WebsitePath } from './WebsitePath';

export type RequireChangeEmailRequestSchema = {
    newEmail: Email;
    password: Password;
    mfaCode: string;
    urlPrefix: AllowedURLPrefixes;
    path: WebsitePath;
    recaptchaToken: string;
    handler: {
        userId: number;
    };
};

