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
import type { GetSelfUser200ResponseSchema } from '../models/GetSelfUser200ResponseSchema';
import type { GetUser200ResponseSchema } from '../models/GetUser200ResponseSchema';
import type { GetUserAsAdmin200ResponseSchema } from '../models/GetUserAsAdmin200ResponseSchema';
import type { GetUserAsAdminRequestSchema } from '../models/GetUserAsAdminRequestSchema';
import type { GetUserRequestSchema } from '../models/GetUserRequestSchema';
import type { ListUsers200ResponseSchema } from '../models/ListUsers200ResponseSchema';
import type { ListUsersAsAdmin200ResponseSchema } from '../models/ListUsersAsAdmin200ResponseSchema';
import type { ListUsersAsAdminRequestSchema } from '../models/ListUsersAsAdminRequestSchema';
import type { ListUsersRequestSchema } from '../models/ListUsersRequestSchema';
import type { Login200ResponseSchema } from '../models/Login200ResponseSchema';
import type { LoginRequestSchema } from '../models/LoginRequestSchema';
import type { OkResponseSchema } from '../models/OkResponseSchema';
import type { OkResponseSchemaLocalTest } from '../models/OkResponseSchemaLocalTest';
import type { RequireChangeEmailRequestSchema } from '../models/RequireChangeEmailRequestSchema';
import type { RequireResetPasswordRequestSchema } from '../models/RequireResetPasswordRequestSchema';
import type { ResendConfirmationEmailRequestSchema } from '../models/ResendConfirmationEmailRequestSchema';
import type { ResetPassword200ResponseSchema } from '../models/ResetPassword200ResponseSchema';
import type { ResetPasswordRequestSchema } from '../models/ResetPasswordRequestSchema';
import type { SetPasswordRequestSchema } from '../models/SetPasswordRequestSchema';
import type { SignupRequestSchema } from '../models/SignupRequestSchema';
import type { UpdateUser200ResponseSchema } from '../models/UpdateUser200ResponseSchema';
import type { UpdateUserAsAdmin200ResponseSchema } from '../models/UpdateUserAsAdmin200ResponseSchema';
import type { UpdateUserAsAdminRequestSchema } from '../models/UpdateUserAsAdminRequestSchema';
import type { UpdateUserPasswordRequestSchema } from '../models/UpdateUserPasswordRequestSchema';
import type { UpdateUserRequestSchema } from '../models/UpdateUserRequestSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

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

}
