/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Hello200ResponseSchema } from '../models/Hello200ResponseSchema';
import type { HelloRequestSchema } from '../models/HelloRequestSchema';
import type { OkResponseSchema } from '../models/OkResponseSchema';
import type { TestHelloMessageRequestSchema } from '../models/TestHelloMessageRequestSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HelloService {

    /**
     * hello
     * hello
     * @param requestBody
     * @returns Hello200ResponseSchema Hello200Response
     * @throws ApiError
     */
    public static hello(
        requestBody?: HelloRequestSchema,
    ): CancelablePromise<Hello200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/hello',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Hello400Response`,
                404: `Hello404Response`,
                405: `Hello405Response`,
                429: `Hello429Response`,
                500: `Hello500Response`,
            },
        });
    }

    /**
     * testHelloMessage
     * testHelloMessage
     * @param requestBody
     * @returns OkResponseSchema TestHelloMessage200Response
     * @throws ApiError
     */
    public static testHelloMessage(
        requestBody?: TestHelloMessageRequestSchema,
    ): CancelablePromise<OkResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/testHelloMessage',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `TestHelloMessage400Response`,
                401: `TestHelloMessage401Response`,
                403: `TestHelloMessage403Response`,
                405: `TestHelloMessage405Response`,
                429: `TestHelloMessage429Response`,
                500: `TestHelloMessage500Response`,
            },
        });
    }

}
