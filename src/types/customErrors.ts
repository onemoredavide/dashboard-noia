import { ClientError, ErrorWithExtra, ServerError } from "$hooks/useErrorHandler"
import { AxiosLoginErrorResponse } from "sdk"

export interface CustomServerError1 extends ServerError {
  path: "/customServer/error"
  status: 400
  data: {
    code: "custom_error_1" | "custom_error_1_1"
    description?: string
  }
  extra: {
    userId: string
    message?: string
  }
}

export interface CustomServerError2 extends ServerError {
  path: "/customServer/error"
  status: 400
  data: {
    code: "custom_error_2" | "custom_error_2_2"
  }
  extra: {
    productId: string
  }
}

export type CustomClientError = ClientError<"CLIENT_ERROR_1"|"CLIENT_ERROR_2", {message: string}>
export type CustomClientErrorWithoutData = ClientError<"CLIENT_ERROR_3">
export type UnexpectedClientError = ClientError<"UNEXPECTED_ERROR", {request: string}>

export type CustomAxiosLoginErrorResponse = ErrorWithExtra<AxiosLoginErrorResponse, {id: number}>
