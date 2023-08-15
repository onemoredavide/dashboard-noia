import { GlobalServiceErrors } from "$components/client/helpers/ErrorHandlersContext"
import { logSentryEvent } from "$helpers/sentry"
import { useErrorBoundary } from "react-error-boundary"
import errcode from "err-code"
import { useCallback, useContext } from "react"
import { ErrorHandlersContext } from "../components/client/helpers/ErrorHandlersContext"
import type { AxiosResponse } from "axios"

// TODO make "code" optional, extends from AxiosResponse
export interface ServerError {
  path: string
  status: number|string
  data: {
    code: number|string
  }
  extra?: undefined|object
}

export type ErrorWithExtra<T extends ServerError, Y extends object> = T & {extra: Y}

export type PartialError<
  T extends ServerError | ClientError,
  Status extends ExtractServerError<T>["status"] | ExtractClientError<T>["code"] = ExtractServerError<T>["status"] | ExtractClientError<T>["code"],
  Code extends Extract<ExtractServerError<T>, {status: Status}>["data"]["code"] = Extract<ExtractServerError<T>, {status: Status}>["data"]["code"]
> = WithServerErrorCode<Extract<ExtractServerError<T>, {status: Extract<Status, ExtractServerError<T>["status"]>}>, Code> | WithClientErrorCode<ExtractClientError<T>, Extract<Status, ExtractClientError<T>["code"]>>

type ExcludeStatusAndCode<
  T extends ServerError,
  Status extends T["status"] = T["status"],
  Code extends Extract<T, {status: Status}>["data"]["code"] = Extract<T, {status: Status}>["data"]["code"]
> = ExcludeNever<{
  [Key in T["status"]]: Key extends Status ? Exclude<Extract<T, {status: Key}>["data"]["code"], Code> : Extract<T, {status: Key}>["data"]["code"]
}>

type CastToCode<
  T extends ServerError,
  Code extends T["data"]["code"]
> = T extends {data: infer U} ? T & {data: (U & {code: Code})} : never

type RebuildError<
  T extends ServerError,
  Y extends Record<number|string, number|string>
> = {
  [Key in keyof Y]: {
    [Code in Y[Key]]: CastToCode<Extract<T, {status: Key}>, Code>
  }[Y[Key]]
}[keyof Y]

export type PartialErrorExclude<
  T extends ServerError | ClientError,
  Status extends ExtractServerError<T>["status"] | ExtractClientError<T>["code"] = ExtractServerError<T>["status"] | ExtractClientError<T>["code"],
  Code extends Extract<ExtractServerError<T>, {status: Status}>["data"]["code"] = Extract<ExtractServerError<T>, {status: Status}>["data"]["code"]
> = RebuildError<ExtractServerError<T>, ExcludeStatusAndCode<ExtractServerError<T>, Status, Code>> | WithClientErrorCode<ExtractClientError<T>, Exclude<ExtractClientError<T>["code"], Status>>

type WithExtraData<T extends {extra?: object|undefined}> = T extends {extra: object} ? T : never

type Handler<T extends {data: object, extra?: object|undefined}> = WithExtraData<T>["extra"] extends object ? (args: {
  error: T["data"]
  showBoundary: (error?: Error) => void
  resetBoundary: () => void
  logError: (error: Error) => void
  data: WithExtraData<T>["extra"]
  next: () => Promise<void>
}) => void | Promise<void> : (args: {
  error: T["data"]
  showBoundary: (error?: Error) => void
  resetBoundary: () => void
  logError: (error: Error) => void
  next: () => Promise<void>
}) => void | Promise<void>

export type HandlerSignature<
  T extends ServerError | ClientError,
  Status extends ExtractServerError<T>["status"] | ExtractClientError<T>["code"] = ExtractServerError<T>["status"] | ExtractClientError<T>["code"],
  Code extends Extract<ExtractServerError<T>, {status: Status}>["data"]["code"] = Extract<ExtractServerError<T>, {status: Status}>["data"]["code"]
> = Handler<PartialError<ExtractServerError<T>, Extract<Status, ExtractServerError<T>["status"]>, Code>> & Handler<{data: PartialError<ExtractClientError<T>, Extract<Status, ExtractClientError<T>["code"]>>}>


type ExtractByCode<T, Code extends string|number> = T extends { data: { code: Code } } ? T : never

type WithExtra<T extends ServerError | ClientError> = T extends ClientError ? never : T extends {extra: object} ? T : never

type ExtractClientError<T extends ServerError | ClientError> = T extends ClientError ? T : never
type ExtractServerError<T extends ServerError | ClientError> = T extends ServerError ? T : never

export type ErrorHandlers<
  T extends ServerError | ClientError,
  Status extends ExtractServerError<T>["status"] | ExtractClientError<T>["code"] = ExtractServerError<T>["status"] | ExtractClientError<T>["code"],
  Code extends Extract<ExtractServerError<T>, {status: Status}>["data"]["code"] = ExtractServerError<T>["data"]["code"]
> = ClientErrorHandlers<ExtractClientError<T>, Extract<Status, ExtractClientError<T>["code"]>> & ServerErrorHandlers<ExtractServerError<T>, Extract<Status, ExtractServerError<T>["status"]>, Code>

type WithServerErrorCode<T extends ServerError, Z extends T["data"]["code"]> = T extends { data: { code: infer U } } ? (U extends Z ? T : never) : never

type WithClientErrorCode<T extends ClientError, Z extends T["code"]> = T extends { code: infer U } ? (U extends Z ? T : never) : never

type ExcludeNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K]
}

type ServerErrorHandlers<T extends ServerError, Status extends T["status"] = T["status"], Code extends Extract<T, {status: Status}>["data"]["code"] = Extract<T, {status: Status}>["data"]["code"]> = {
  [path in T["path"]]: ExcludeNever<{
    [statusCode in Extract<Status, Extract<T, {path: path}>["status"]>]: Extract<Code, Extract<Extract<T, {path: path}>, {status: statusCode}>["data"]["code"]> extends never ? never : {
      [errorCode in Extract<Code, Extract<Extract<T, {path: path}>, {status: statusCode}>["data"]["code"]>]: HandlerSignature<Extract<T, {path: path}>, statusCode, errorCode>
    }
  }>
}

type ClientErrorHandlers<T extends ClientError, Z extends T["code"] = T["code"]> = {
  [code in Z]: HandlerSignature<T, code>
}

export type ClientError<T extends string = string, Y extends object|undefined = undefined> = Error & (Y extends undefined ? { code: T }:{ code: T, data: Y })

export type ServiceErrorHandlers<T extends Record<string, ServerError | ClientError>> = {
  [service in keyof T]: ErrorHandlers<T[service]>
}

type UseErrorHandler<T extends Record<string, ServerError | ClientError>> = {
  handleError: (<ServiceType extends keyof T, Y extends WithExtra<T[ServiceType]>>(
    service: ServiceType,
    args: {
      error: Y extends ServerError ? Omit<Y, "extra"> : Y
      extra: Y extends ServerError ? ExtractByCode<Extract<Extract<Y, {path: Y["path"]}>, {status: Y["status"]}>, Y["data"]["code"]>["extra"] : never
    }
  ) => Promise<void>) & (<ServiceType extends keyof T, Y extends Exclude<T[ServiceType], WithExtra<T[ServiceType]>>>(
    service: ServiceType,
    args: {error: Y extends ServerError ? Omit<Y, "extra"> : Y}
  ) => Promise<void>)
}

type MergeMap<T extends Record<string, ServerError | ClientError>, Y extends Record<string, ServerError | ClientError>> = {
  [key in keyof T | keyof Y]: (key extends keyof T ? T[key] : key extends keyof Y ? Y[key]: never) | (key extends keyof Y ? Y[key] : key extends keyof T ? T[key] : never)
}

/**
 * `useErrorHandler` is a custom hook that provides a way to handle errors.
 * The id is used to uniquely identify the error handler in a monitoring system like Sentry.
 * It can be used with global service errors or with a specific set of service error handlers.
 *
 * @function
 * @param {string} id - The unique identifier used to track the error handler in the monitoring system (es. Sentry).
 * @returns {UseErrorHandler<GlobalServiceErrors>} - A hook that can be used to handle errors.
 *
 * @example
 * const errorHandler = useErrorHandler('unique-human-readable-id');
 * const errorHandler = useErrorHandler('unique-human-readable-id', myServiceErrorHandlers);
 */
export function useErrorHandler(id: string): UseErrorHandler<GlobalServiceErrors>;
export function useErrorHandler<T extends Record<string, ServerError | ClientError> = never>(id: string, handlers: ServiceErrorHandlers<T>): UseErrorHandler<MergeMap<T, GlobalServiceErrors>>;
export function useErrorHandler<T extends Record<string, ServerError | ClientError> = never>(id: string, handlers?: ServiceErrorHandlers<T>): UseErrorHandler<MergeMap<T, GlobalServiceErrors>> {
  // TODO id: get parent component name

  const { showBoundary, resetBoundary } = useErrorBoundary()
  const globalErrorHandlers = useContext(ErrorHandlersContext)

  const handleError = useCallback(async<ServiceType extends (keyof T | keyof GlobalServiceErrors)>(
    service: ServiceType,
    args: {
      error: (MergeMap<T, GlobalServiceErrors>)[ServiceType] extends ServerError ? Omit<(MergeMap<T, GlobalServiceErrors>)[ServiceType], "extra"> : (MergeMap<T, GlobalServiceErrors>)[ServiceType]
      extra?: (MergeMap<T, GlobalServiceErrors>)[ServiceType] extends ServerError ? (MergeMap<T, GlobalServiceErrors>)[ServiceType]["extra"] : never
    },
  ): Promise<void> => {
    try {
      const { error, extra } = args
      const _showBoundary = (_?: Error): void => {
        const out = (_ || error) as {
          handledException?: boolean
        }

        out.handledException = true

        showBoundary(out)
      }

      const _logError = (data: Error): void => {
        logSentryEvent(data, {
          level: "error",
          tags: {
            componentId: id
          },
          extra: {
            error,
            extra
          }
        })
      }

      if (error instanceof Error) {
        const { code } = error
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler = (handlers as any)?.[service]?.[code]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const globalHandler = (globalErrorHandlers as any)[service]?.[code]

        if (handler) {
          await handler({
            error,
            showBoundary: _showBoundary,
            resetBoundary,
            logError: _logError,
            next: async(): Promise<void> => {
              if (!globalHandler) {
                throw new Error("Client global error handler not found")
              }

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              await globalHandler({
                error,
                showBoundary: _showBoundary,
                resetBoundary,
                logError: _logError,
                next: async(): Promise<void> => {
                  throw new Error("Cannot call next on global error handler")
                }
              })
            }
          })
          return
        }

        if (globalHandler) {
          await globalHandler({
            error,
            showBoundary: _showBoundary,
            resetBoundary,
            logError: _logError,
            next: async(): Promise<void> => {
              throw new Error("Cannot call next on global error handler")
            }
          })
          return
        }

        throw new Error("Client error handler not found")
      }

      const {
        path: errorPath,
        status,
        data: {
          code
        },
        config
      } = error as AxiosResponse<{code: string}> & {path?: string}

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const path = errorPath || new URL(config.url!).pathname

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handler = (handlers as any)?.[service]?.[path]?.[status]?.[code]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const globalHandler = (globalErrorHandlers as any)[service]?.[path]?.[status]?.[code]

      if (handler) {
        await handler({
          error: error.data,
          extra,
          showBoundary: _showBoundary,
          resetBoundary,
          logError: _logError,
          next: async(): Promise<void> => {
            if (!globalHandler) {
              throw new Error("Server global error handler not found")
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await globalHandler({
              error: error.data,
              extra,
              showBoundary: _showBoundary,
              resetBoundary,
              logError: _logError,
              next: async(): Promise<void> => {
                throw new Error("Cannot call next on global error handler")
              }
            })
          }
        })
        return
      }

      if (globalHandler) {
        await globalHandler({
          error: error.data,
          extra,
          showBoundary: _showBoundary,
          resetBoundary,
          logError: _logError,
          next: async(): Promise<void> => {
            throw new Error("Cannot call next on global error handler")
          }
        })
        return
      }

      throw new Error("Server error handler not found")
    } catch (unhandledError) {
      logSentryEvent(unhandledError as Error, {
        level: "fatal",
        tags: {
          componentId: id
        },
        extra: {
          error: args.error,
          extra: args.extra
        }
      })

      ;(unhandledError as Error & {handledException: boolean}).handledException = true
      showBoundary(unhandledError)
    }
  }, [
    showBoundary,
    resetBoundary,
    handlers,
    id,
    globalErrorHandlers
  ])

  return {
    handleError
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
type CreateErrorParams<T extends ClientError<string, undefined>> = T extends {data: object} ? [Error|unknown, T["code"], T["data"]] : [Error|unknown, T["code"]]

/**
 * Creates a new error object with a specified code and data(if present).
 *
 * @example
 *
 *  const error = createError<CustomClientError1>(new Error("test"), "CLIENT_ERROR_1", { message: "ciao" })
 *  const error = createError<CustomClientError2>(new Error("test"), "CLIENT_ERROR_2")
 */
export function createError<T extends ClientError<string, object|undefined>>(...args: CreateErrorParams<T>
): T;

export function createError<T extends ClientError<string, object|undefined>>(
  // eslint-disable-next-line @typescript-eslint/ban-types
  error: Error|unknown,
  code: T["code"],
  data?: T extends { data: object } ? T["data"] : never
): T {
  if (!(error instanceof Error)) {
    throw new Error("First argument must be an Error")
  }

  return errcode(error, code, { data }) as T
}
