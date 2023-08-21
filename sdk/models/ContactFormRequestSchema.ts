/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Email } from './Email';

export type ContactFormRequestSchema = {
    email: Email;
    message: string;
    recaptchaToken: string;
};

