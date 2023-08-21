/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AllowedURLPrefixes } from './AllowedURLPrefixes';
import type { Email } from './Email';
import type { WebsitePath } from './WebsitePath';

export type ResendConfirmationEmailRequestSchema = {
    email: Email;
    urlPrefix: AllowedURLPrefixes;
    path: WebsitePath;
    recaptchaToken: string;
};

