/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetConfig200ResponseSchema } from '../models/GetConfig200ResponseSchema';
import type { GetConfigRequestSchema } from '../models/GetConfigRequestSchema';
import type { ListConfigs200ResponseSchema } from '../models/ListConfigs200ResponseSchema';
import type { ListConfigsRequestSchema } from '../models/ListConfigsRequestSchema';
import type { MGetConfigs200ResponseSchema } from '../models/MGetConfigs200ResponseSchema';
import type { MGetConfigsRequestSchema } from '../models/MGetConfigsRequestSchema';
import type { UpdateConfig200ResponseSchema } from '../models/UpdateConfig200ResponseSchema';
import type { UpdateConfigRequestSchema } from '../models/UpdateConfigRequestSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConfigsService {

    /**
     * getConfig
     * getConfig
     * @param requestBody
     * @returns GetConfig200ResponseSchema GetConfig200Response
     * @throws ApiError
     */
    public static getConfig(
        requestBody?: GetConfigRequestSchema,
    ): CancelablePromise<GetConfig200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/getConfig',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `GetConfig400Response`,
                401: `GetConfig401Response`,
                403: `GetConfig403Response`,
                404: `GetConfig404Response`,
                405: `GetConfig405Response`,
                429: `GetConfig429Response`,
                500: `GetConfig500Response`,
            },
        });
    }

    /**
     * mGetConfigs
     * mGetConfigs
     * @param requestBody
     * @returns MGetConfigs200ResponseSchema MGetConfigs200Response
     * @throws ApiError
     */
    public static mGetConfigs(
        requestBody?: MGetConfigsRequestSchema,
    ): CancelablePromise<MGetConfigs200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/mGetConfigs',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `MGetConfigs400Response`,
                401: `MGetConfigs401Response`,
                403: `MGetConfigs403Response`,
                405: `MGetConfigs405Response`,
                429: `MGetConfigs429Response`,
                500: `MGetConfigs500Response`,
            },
        });
    }

    /**
     * listConfigs
     * listConfigs
     * @param requestBody
     * @returns ListConfigs200ResponseSchema ListConfigs200Response
     * @throws ApiError
     */
    public static listConfigs(
        requestBody?: ListConfigsRequestSchema,
    ): CancelablePromise<ListConfigs200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/listConfigs',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `ListConfigs400Response`,
                401: `ListConfigs401Response`,
                403: `ListConfigs403Response`,
                405: `ListConfigs405Response`,
                429: `ListConfigs429Response`,
                500: `ListConfigs500Response`,
            },
        });
    }

    /**
     * updateConfig
     * updateConfig
     * @param requestBody
     * @returns UpdateConfig200ResponseSchema UpdateConfig200Response
     * @throws ApiError
     */
    public static updateConfig(
        requestBody?: UpdateConfigRequestSchema,
    ): CancelablePromise<UpdateConfig200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/updateConfig',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `UpdateConfig400Response`,
                401: `UpdateConfig401Response`,
                403: `UpdateConfig403Response`,
                405: `UpdateConfig405Response`,
                429: `UpdateConfig429Response`,
                500: `UpdateConfig500Response`,
            },
        });
    }

}
