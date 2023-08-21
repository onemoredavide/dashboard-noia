/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ImageObject } from './ImageObject';

export type GetImageUploadPresignedUrl200ResponseSchema = {
    data: {
        presignedUrl: string;
        image: ImageObject;
    };
};

