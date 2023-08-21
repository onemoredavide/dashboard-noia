/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnonymizeUser200ResponseSchema } from '../models/AnonymizeUser200ResponseSchema';
import type { AnonymizeUserRequestSchema } from '../models/AnonymizeUserRequestSchema';
import type { ChangeEmail200ResponseSchema } from '../models/ChangeEmail200ResponseSchema';
import type { ChangeEmailRequestSchema } from '../models/ChangeEmailRequestSchema';
import type { CheckChangeEmailCode200ResponseSchema } from '../models/CheckChangeEmailCode200ResponseSchema';
import type { CheckChangeEmailCodeRequestSchema } from '../models/CheckChangeEmailCodeRequestSchema';
import type { CheckConfirmEmailCode200ResponseSchema } from '../models/CheckConfirmEmailCode200ResponseSchema';
import type { CheckConfirmEmailCodeRequestSchema } from '../models/CheckConfirmEmailCodeRequestSchema';
import type { CheckRequireResetPasswordCode200ResponseSchema } from '../models/CheckRequireResetPasswordCode200ResponseSchema';
import type { CheckRequireResetPasswordCodeRequestSchema } from '../models/CheckRequireResetPasswordCodeRequestSchema';
import type { ConfirmEmail200ResponseSchema } from '../models/ConfirmEmail200ResponseSchema';
import type { ConfirmEmailRequestSchema } from '../models/ConfirmEmailRequestSchema';
import type { ContactFormRequestSchema } from '../models/ContactFormRequestSchema';
import type { Docs200ResponseSchema } from '../models/Docs200ResponseSchema';
import type { GetConfig200ResponseSchema } from '../models/GetConfig200ResponseSchema';
import type { GetConfigRequestSchema } from '../models/GetConfigRequestSchema';
import type { GetImageUploadPresignedUrl200ResponseSchema } from '../models/GetImageUploadPresignedUrl200ResponseSchema';
import type { GetImageUploadPresignedUrlRequestSchema } from '../models/GetImageUploadPresignedUrlRequestSchema';
import type { GetSelfUser200ResponseSchema } from '../models/GetSelfUser200ResponseSchema';
import type { GetUser200ResponseSchema } from '../models/GetUser200ResponseSchema';
import type { GetUserAsAdmin200ResponseSchema } from '../models/GetUserAsAdmin200ResponseSchema';
import type { GetUserAsAdminRequestSchema } from '../models/GetUserAsAdminRequestSchema';
import type { GetUserRequestSchema } from '../models/GetUserRequestSchema';
import type { GetUserSSE200ResponseSchema } from '../models/GetUserSSE200ResponseSchema';
import type { Health200ResponseSchema } from '../models/Health200ResponseSchema';
import type { Hello200ResponseSchema } from '../models/Hello200ResponseSchema';
import type { HelloRequestSchema } from '../models/HelloRequestSchema';
import type { ListConfigs200ResponseSchema } from '../models/ListConfigs200ResponseSchema';
import type { ListConfigsRequestSchema } from '../models/ListConfigsRequestSchema';
import type { ListUsers200ResponseSchema } from '../models/ListUsers200ResponseSchema';
import type { ListUsersAsAdmin200ResponseSchema } from '../models/ListUsersAsAdmin200ResponseSchema';
import type { ListUsersAsAdminRequestSchema } from '../models/ListUsersAsAdminRequestSchema';
import type { ListUsersRequestSchema } from '../models/ListUsersRequestSchema';
import type { ListUserWebNotifications200ResponseSchema } from '../models/ListUserWebNotifications200ResponseSchema';
import type { ListUserWebNotificationsRequestSchema } from '../models/ListUserWebNotificationsRequestSchema';
import type { Login200ResponseSchema } from '../models/Login200ResponseSchema';
import type { LoginRequestSchema } from '../models/LoginRequestSchema';
import type { MarkUserWebNotificationAsReadRequestSchema } from '../models/MarkUserWebNotificationAsReadRequestSchema';
import type { MGetConfigs200ResponseSchema } from '../models/MGetConfigs200ResponseSchema';
import type { MGetConfigsRequestSchema } from '../models/MGetConfigsRequestSchema';
import type { OkResponseSchema } from '../models/OkResponseSchema';
import type { OkResponseSchemaLocalTest } from '../models/OkResponseSchemaLocalTest';
import type { RequireChangeEmailRequestSchema } from '../models/RequireChangeEmailRequestSchema';
import type { RequireResetPasswordRequestSchema } from '../models/RequireResetPasswordRequestSchema';
import type { ResendConfirmationEmailRequestSchema } from '../models/ResendConfirmationEmailRequestSchema';
import type { ResetPassword200ResponseSchema } from '../models/ResetPassword200ResponseSchema';
import type { ResetPasswordRequestSchema } from '../models/ResetPasswordRequestSchema';
import type { SetPasswordRequestSchema } from '../models/SetPasswordRequestSchema';
import type { SignupRequestSchema } from '../models/SignupRequestSchema';
import type { TestHelloMessageRequestSchema } from '../models/TestHelloMessageRequestSchema';
import type { UpdateConfig200ResponseSchema } from '../models/UpdateConfig200ResponseSchema';
import type { UpdateConfigRequestSchema } from '../models/UpdateConfigRequestSchema';
import type { UpdateUser200ResponseSchema } from '../models/UpdateUser200ResponseSchema';
import type { UpdateUserAsAdmin200ResponseSchema } from '../models/UpdateUserAsAdmin200ResponseSchema';
import type { UpdateUserAsAdminRequestSchema } from '../models/UpdateUserAsAdminRequestSchema';
import type { UpdateUserPasswordRequestSchema } from '../models/UpdateUserPasswordRequestSchema';
import type { UpdateUserRequestSchema } from '../models/UpdateUserRequestSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class V1Service {

    /**
     * health
     * health
     * @returns Health200ResponseSchema Health200Response
     * @throws ApiError
     */
    public static health(): CancelablePromise<Health200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/health',
            errors: {
                400: `Health400Response`,
                405: `Health405Response`,
                429: `Health429Response`,
                500: `Health500Response`,
            },
        });
    }

    /**
     * docs
     * docs
     * @param format
     * @returns Docs200ResponseSchema Docs200Response
     * @throws ApiError
     */
    public static docs(
        format?: 'json',
    ): CancelablePromise<Docs200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/docs',
            query: {
                'format': format,
            },
            errors: {
                400: `Docs400Response`,
                405: `Docs405Response`,
                429: `Docs429Response`,
                500: `Docs500Response`,
            },
        });
    }

    /**
     * getImageUploadPresignedUrl
     * Get presignedUrl for image upload
     * @param requestBody
     * @returns GetImageUploadPresignedUrl200ResponseSchema GetImageUploadPresignedUrl200Response
     * @throws ApiError
     */
    public static getImageUploadPresignedUrl(
        requestBody?: GetImageUploadPresignedUrlRequestSchema,
    ): CancelablePromise<GetImageUploadPresignedUrl200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/getImageUploadPresignedUrl',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `GetImageUploadPresignedUrl400Response`,
                401: `GetImageUploadPresignedUrl401Response`,
                403: `GetImageUploadPresignedUrl403Response`,
                404: `GetImageUploadPresignedUrl404Response`,
                405: `GetImageUploadPresignedUrl405Response`,
                429: `GetImageUploadPresignedUrl429Response`,
                500: `GetImageUploadPresignedUrl500Response`,
            },
        });
    }

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

    /**
     * signup
     * Sign up
     * @param requestBody
     * @returns OkResponseSchemaLocalTest Signup200Response
     * @throws ApiError
     */
    public static signup(
        requestBody?: SignupRequestSchema,
    ): CancelablePromise<OkResponseSchemaLocalTest> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Signup400Response`,
                405: `Signup405Response`,
                429: `Signup429Response`,
                500: `Signup500Response`,
            },
        });
    }

    /**
     * login
     * login
     * @param requestBody
     * @returns Login200ResponseSchema Login200Response
     * @throws ApiError
     */
    public static login(
        requestBody?: LoginRequestSchema,
    ): CancelablePromise<Login200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Login400Response`,
                401: `Login401Response`,
                404: `Login404Response`,
                405: `Login405Response`,
                429: `Login429Response`,
                500: `Login500Response`,
            },
        });
    }

    /**
     * confirmEmail
     * Confirm Email
     * @param requestBody
     * @returns ConfirmEmail200ResponseSchema ConfirmEmail200Response
     * @throws ApiError
     */
    public static confirmEmail(
        requestBody?: ConfirmEmailRequestSchema,
    ): CancelablePromise<ConfirmEmail200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/confirmEmail',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `ConfirmEmail400Response`,
                404: `ConfirmEmail404Response`,
                405: `ConfirmEmail405Response`,
                429: `ConfirmEmail429Response`,
                500: `ConfirmEmail500Response`,
            },
        });
    }

    /**
     * requireResetPassword
     * requireResetPassword
     * @param requestBody
     * @returns OkResponseSchemaLocalTest RequireResetPassword200Response
     * @throws ApiError
     */
    public static requireResetPassword(
        requestBody?: RequireResetPasswordRequestSchema,
    ): CancelablePromise<OkResponseSchemaLocalTest> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/requireResetPassword',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `RequireResetPassword400Response`,
                404: `RequireResetPassword404Response`,
                405: `RequireResetPassword405Response`,
                429: `RequireResetPassword429Response`,
                500: `RequireResetPassword500Response`,
            },
        });
    }

    /**
     * resendConfirmationEmail
     * resendConfirmationEmail
     * @param requestBody
     * @returns OkResponseSchemaLocalTest ResendConfirmationEmail200Response
     * @throws ApiError
     */
    public static resendConfirmationEmail(
        requestBody?: ResendConfirmationEmailRequestSchema,
    ): CancelablePromise<OkResponseSchemaLocalTest> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/resendConfirmationEmail',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `ResendConfirmationEmail400Response`,
                404: `ResendConfirmationEmail404Response`,
                405: `ResendConfirmationEmail405Response`,
                429: `ResendConfirmationEmail429Response`,
                500: `ResendConfirmationEmail500Response`,
            },
        });
    }

    /**
     * resetPassword
     * reset password
     * @param requestBody
     * @returns ResetPassword200ResponseSchema ResetPassword200Response
     * @throws ApiError
     */
    public static resetPassword(
        requestBody?: ResetPasswordRequestSchema,
    ): CancelablePromise<ResetPassword200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/resetPassword',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `ResetPassword400Response`,
                404: `ResetPassword404Response`,
                405: `ResetPassword405Response`,
                429: `ResetPassword429Response`,
                500: `ResetPassword500Response`,
            },
        });
    }

    /**
     * updateUserPassword
     * updateUserPassword
     * @param requestBody
     * @returns OkResponseSchema UpdateUserPassword200Response
     * @throws ApiError
     */
    public static updateUserPassword(
        requestBody?: UpdateUserPasswordRequestSchema,
    ): CancelablePromise<OkResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/updateUserPassword',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `UpdateUserPassword400Response`,
                401: `UpdateUserPassword401Response`,
                403: `UpdateUserPassword403Response`,
                404: `UpdateUserPassword404Response`,
                405: `UpdateUserPassword405Response`,
                429: `UpdateUserPassword429Response`,
                500: `UpdateUserPassword500Response`,
            },
        });
    }

    /**
     * getUser
     * getUser
     * @param requestBody
     * @returns GetUser200ResponseSchema GetUser200Response
     * @throws ApiError
     */
    public static getUser(
        requestBody?: GetUserRequestSchema,
    ): CancelablePromise<GetUser200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/getUser',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `GetUser400Response`,
                401: `GetUser401Response`,
                403: `GetUser403Response`,
                404: `GetUser404Response`,
                405: `GetUser405Response`,
                429: `GetUser429Response`,
                500: `GetUser500Response`,
            },
        });
    }

    /**
     * updateUser
     * updateUser
     * @param requestBody
     * @returns UpdateUser200ResponseSchema UpdateUser200Response
     * @throws ApiError
     */
    public static updateUser(
        requestBody?: UpdateUserRequestSchema,
    ): CancelablePromise<UpdateUser200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/updateUser',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `UpdateUser400Response`,
                401: `UpdateUser401Response`,
                403: `UpdateUser403Response`,
                404: `UpdateUser404Response`,
                405: `UpdateUser405Response`,
                429: `UpdateUser429Response`,
                500: `UpdateUser500Response`,
            },
        });
    }

    /**
     * checkConfirmEmailCode
     * checkConfirmEmailCode
     * @param requestBody
     * @returns CheckConfirmEmailCode200ResponseSchema CheckConfirmEmailCode200Response
     * @throws ApiError
     */
    public static checkConfirmEmailCode(
        requestBody?: CheckConfirmEmailCodeRequestSchema,
    ): CancelablePromise<CheckConfirmEmailCode200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/checkConfirmEmailCode',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `CheckConfirmEmailCode400Response`,
                404: `CheckConfirmEmailCode404Response`,
                405: `CheckConfirmEmailCode405Response`,
                429: `CheckConfirmEmailCode429Response`,
                500: `CheckConfirmEmailCode500Response`,
            },
        });
    }

    /**
     * requireChangeEmail
     * requireChangeEmail
     * @param requestBody
     * @returns OkResponseSchemaLocalTest RequireChangeEmail200Response
     * @throws ApiError
     */
    public static requireChangeEmail(
        requestBody?: RequireChangeEmailRequestSchema,
    ): CancelablePromise<OkResponseSchemaLocalTest> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/requireChangeEmail',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `RequireChangeEmail400Response`,
                401: `RequireChangeEmail401Response`,
                403: `RequireChangeEmail403Response`,
                405: `RequireChangeEmail405Response`,
                429: `RequireChangeEmail429Response`,
                500: `RequireChangeEmail500Response`,
            },
        });
    }

    /**
     * checkChangeEmailCode
     * checkChangeEmailCode
     * @param requestBody
     * @returns CheckChangeEmailCode200ResponseSchema CheckChangeEmailCode200Response
     * @throws ApiError
     */
    public static checkChangeEmailCode(
        requestBody?: CheckChangeEmailCodeRequestSchema,
    ): CancelablePromise<CheckChangeEmailCode200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/checkChangeEmailCode',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `CheckChangeEmailCode400Response`,
                404: `CheckChangeEmailCode404Response`,
                405: `CheckChangeEmailCode405Response`,
                429: `CheckChangeEmailCode429Response`,
                500: `CheckChangeEmailCode500Response`,
            },
        });
    }

    /**
     * changeEmail
     * Change Email
     * @param requestBody
     * @returns ChangeEmail200ResponseSchema ChangeEmail200Response
     * @throws ApiError
     */
    public static changeEmail(
        requestBody?: ChangeEmailRequestSchema,
    ): CancelablePromise<ChangeEmail200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/changeEmail',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `ChangeEmail400Response`,
                404: `ChangeEmail404Response`,
                405: `ChangeEmail405Response`,
                429: `ChangeEmail429Response`,
                500: `ChangeEmail500Response`,
            },
        });
    }

    /**
     * updateUserAsAdmin
     * updateUserAsAdmin
     * @param requestBody
     * @returns UpdateUserAsAdmin200ResponseSchema UpdateUserAsAdmin200Response
     * @throws ApiError
     */
    public static updateUserAsAdmin(
        requestBody?: UpdateUserAsAdminRequestSchema,
    ): CancelablePromise<UpdateUserAsAdmin200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/updateUserAsAdmin',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `UpdateUserAsAdmin400Response`,
                401: `UpdateUserAsAdmin401Response`,
                403: `UpdateUserAsAdmin403Response`,
                404: `UpdateUserAsAdmin404Response`,
                405: `UpdateUserAsAdmin405Response`,
                429: `UpdateUserAsAdmin429Response`,
                500: `UpdateUserAsAdmin500Response`,
            },
        });
    }

    /**
     * listUsers
     * listUsers
     * @param requestBody
     * @returns ListUsers200ResponseSchema ListUsers200Response
     * @throws ApiError
     */
    public static listUsers(
        requestBody?: ListUsersRequestSchema,
    ): CancelablePromise<ListUsers200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/listUsers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `ListUsers400Response`,
                401: `ListUsers401Response`,
                403: `ListUsers403Response`,
                405: `ListUsers405Response`,
                429: `ListUsers429Response`,
                500: `ListUsers500Response`,
            },
        });
    }

    /**
     * logout
     * Logout
     * @returns OkResponseSchema Logout200Response
     * @throws ApiError
     */
    public static logout(): CancelablePromise<OkResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/logout',
            errors: {
                400: `Logout400Response`,
                401: `Logout401Response`,
                403: `Logout403Response`,
                405: `Logout405Response`,
                429: `Logout429Response`,
                500: `Logout500Response`,
            },
        });
    }

    /**
     * setPassword
     * setPassword
     * @param requestBody
     * @returns OkResponseSchema SetPassword200Response
     * @throws ApiError
     */
    public static setPassword(
        requestBody?: SetPasswordRequestSchema,
    ): CancelablePromise<OkResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/setPassword',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `SetPassword400Response`,
                401: `SetPassword401Response`,
                403: `SetPassword403Response`,
                405: `SetPassword405Response`,
                429: `SetPassword429Response`,
                500: `SetPassword500Response`,
            },
        });
    }

    /**
     * getSelfUser
     * getSelfUser
     * @returns GetSelfUser200ResponseSchema GetSelfUser200Response
     * @throws ApiError
     */
    public static getSelfUser(): CancelablePromise<GetSelfUser200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/getSelfUser',
            errors: {
                400: `GetSelfUser400Response`,
                401: `GetSelfUser401Response`,
                403: `GetSelfUser403Response`,
                404: `GetSelfUser404Response`,
                405: `GetSelfUser405Response`,
                429: `GetSelfUser429Response`,
                500: `GetSelfUser500Response`,
            },
        });
    }

    /**
     * checkRequireResetPasswordCode
     * checkRequireResetPasswordCode
     * @param requestBody
     * @returns CheckRequireResetPasswordCode200ResponseSchema CheckRequireResetPasswordCode200Response
     * @throws ApiError
     */
    public static checkRequireResetPasswordCode(
        requestBody?: CheckRequireResetPasswordCodeRequestSchema,
    ): CancelablePromise<CheckRequireResetPasswordCode200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/checkRequireResetPasswordCode',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `CheckRequireResetPasswordCode400Response`,
                404: `CheckRequireResetPasswordCode404Response`,
                405: `CheckRequireResetPasswordCode405Response`,
                429: `CheckRequireResetPasswordCode429Response`,
                500: `CheckRequireResetPasswordCode500Response`,
            },
        });
    }

    /**
     * anonymizeUser
     * anonymizeUser
     * @param requestBody
     * @returns AnonymizeUser200ResponseSchema AnonymizeUser200Response
     * @throws ApiError
     */
    public static anonymizeUser(
        requestBody?: AnonymizeUserRequestSchema,
    ): CancelablePromise<AnonymizeUser200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/anonymizeUser',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `AnonymizeUser400Response`,
                401: `AnonymizeUser401Response`,
                403: `AnonymizeUser403Response`,
                404: `AnonymizeUser404Response`,
                405: `AnonymizeUser405Response`,
                429: `AnonymizeUser429Response`,
                500: `AnonymizeUser500Response`,
            },
        });
    }

    /**
     * contactForm
     * contact form
     * @param requestBody
     * @returns OkResponseSchema ContactForm200Response
     * @throws ApiError
     */
    public static contactForm(
        requestBody?: ContactFormRequestSchema,
    ): CancelablePromise<OkResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/contactForm',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `ContactForm400Response`,
                405: `ContactForm405Response`,
                429: `ContactForm429Response`,
                500: `ContactForm500Response`,
            },
        });
    }

    /**
     * getUserAsAdmin
     * getUserAsAdmin
     * @param requestBody
     * @returns GetUserAsAdmin200ResponseSchema GetUserAsAdmin200Response
     * @throws ApiError
     */
    public static getUserAsAdmin(
        requestBody?: GetUserAsAdminRequestSchema,
    ): CancelablePromise<GetUserAsAdmin200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/getUserAsAdmin',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `GetUserAsAdmin400Response`,
                401: `GetUserAsAdmin401Response`,
                403: `GetUserAsAdmin403Response`,
                404: `GetUserAsAdmin404Response`,
                405: `GetUserAsAdmin405Response`,
                429: `GetUserAsAdmin429Response`,
                500: `GetUserAsAdmin500Response`,
            },
        });
    }

    /**
     * listUsersAsAdmin
     * listUsersAsAdmin
     * @param requestBody
     * @returns ListUsersAsAdmin200ResponseSchema ListUsersAsAdmin200Response
     * @throws ApiError
     */
    public static listUsersAsAdmin(
        requestBody?: ListUsersAsAdminRequestSchema,
    ): CancelablePromise<ListUsersAsAdmin200ResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/listUsersAsAdmin',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `ListUsersAsAdmin400Response`,
                401: `ListUsersAsAdmin401Response`,
                403: `ListUsersAsAdmin403Response`,
                405: `ListUsersAsAdmin405Response`,
                429: `ListUsersAsAdmin429Response`,
                500: `ListUsersAsAdmin500Response`,
            },
        });
    }

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
