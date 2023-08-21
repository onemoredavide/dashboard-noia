/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetUserSSE200ResponseSchema } from '../models/GetUserSSE200ResponseSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SseService {

    /**
     * getUserSSE
     * Get user server side events
     * @param userId
     * @returns GetUserSSE200ResponseSchema GetUserSSE200Response
     * @throws ApiError
     */
    public static getUserSse(
        userId: number,
    ): CancelablePromise<GetUserSSE200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/getUserSSE',
            query: {
                'userId': userId,
            },
            errors: {
                400: `GetUserSSE400Response`,
                401: `GetUserSSE401Response`,
                403: `GetUserSSE403Response`,
                404: `GetUserSSE404Response`,
                405: `GetUserSSE405Response`,
                429: `GetUserSSE429Response`,
                500: `GetUserSSE500Response`,
            },
        });
    }

}
