/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListUserWebNotifications200ResponseSchema } from '../models/ListUserWebNotifications200ResponseSchema';
import type { ListUserWebNotificationsRequestSchema } from '../models/ListUserWebNotificationsRequestSchema';
import type { MarkUserWebNotificationAsReadRequestSchema } from '../models/MarkUserWebNotificationAsReadRequestSchema';
import type { OkResponseSchema } from '../models/OkResponseSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WebNotificationsService {

    /**
     * listUserWebNotifications
     * listUserWebNotifications
     * @param requestBody
     * @returns ListUserWebNotifications200ResponseSchema ListUserWebNotifications200Response
     * @throws ApiError
     */
    public static listUserWebNotifications(
        requestBody?: ListUserWebNotificationsRequestSchema,
    ): CancelablePromise<ListUserWebNotifications200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/listUserWebNotifications',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `ListUserWebNotifications400Response`,
                401: `ListUserWebNotifications401Response`,
                403: `ListUserWebNotifications403Response`,
                405: `ListUserWebNotifications405Response`,
                429: `ListUserWebNotifications429Response`,
                500: `ListUserWebNotifications500Response`,
            },
        });
    }

    /**
     * markUserWebNotificationAsRead
     * markUserWebNotificationAsRead
     * @param requestBody
     * @returns OkResponseSchema MarkUserWebNotificationAsRead200Response
     * @throws ApiError
     */
    public static markUserWebNotificationAsRead(
        requestBody?: MarkUserWebNotificationAsReadRequestSchema,
    ): CancelablePromise<OkResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/markUserWebNotificationAsRead',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `MarkUserWebNotificationAsRead400Response`,
                401: `MarkUserWebNotificationAsRead401Response`,
                403: `MarkUserWebNotificationAsRead403Response`,
                404: `MarkUserWebNotificationAsRead404Response`,
                405: `MarkUserWebNotificationAsRead405Response`,
                429: `MarkUserWebNotificationAsRead429Response`,
                500: `MarkUserWebNotificationAsRead500Response`,
            },
        });
    }

}
