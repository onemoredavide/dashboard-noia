/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AllowedURLPrefixes } from './AllowedURLPrefixes';
import type { Email } from './Email';
import type { WebsitePath } from './WebsitePath';

export type RequireResetPasswordRequestSchema = {
    email: Email;
    urlPrefix: AllowedURLPrefixes;
    path: WebsitePath;
    recaptchaToken: string;
};

