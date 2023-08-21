/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Timestamp } from './Timestamp';

export type Notification = {
    id: number;
    creationTimestamp: Timestamp;
    readTimestamp: Timestamp;
    read: boolean;
    title: string;
    body: string;
    ctaPath: string;
    userId: number;
};

