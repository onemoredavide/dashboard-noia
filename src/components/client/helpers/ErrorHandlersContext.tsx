/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
"use client"
import { FC, PropsWithChildren, createContext, useContext, useMemo } from "react"
import { ErrorHandlers, HandlerSignature, PartialErrorExclude, ServiceErrorHandlers } from "../../../hooks/useErrorHandler"
import { DemoContext } from "./DemoContext"
import type { AxiosAcceptOrganizationInvitationErrorResponse } from "sdk"
import { CustomAxiosLoginErrorResponse, CustomClientError, UnexpectedClientError } from "$types/customErrors"

// TODO improve the types declaration as Record<string, ClientError|ServerError>
export type GlobalServiceErrors = {
  client: UnexpectedClientError | CustomClientError
  sdk: AxiosAcceptOrganizationInvitationErrorResponse | CustomAxiosLoginErrorResponse
  demo: PartialErrorExclude<
    PartialErrorExclude<
    AxiosAcceptOrganizationInvitationErrorResponse|CustomAxiosLoginErrorResponse,
      429,
      "THROTTLING"
    >,
    404,
    "NOT_FOUND"
  >
}

export const ErrorHandlersContext = createContext<ServiceErrorHandlers<GlobalServiceErrors>|null>(null)

const handler: HandlerSignature<AxiosAcceptOrganizationInvitationErrorResponse|CustomAxiosLoginErrorResponse> = (args) => {

}

const demoHandlers: ErrorHandlers<GlobalServiceErrors["demo"]> = {
  "/v1/acceptOrganizationInvitation": {
    400: {
      VALIDATION_ERROR: handler
    },
    401: {
      UNAUTHORIZED: handler
    },
    403: {
      FORBIDDEN: handler
    },
    500: {
      UNEXPECTED_ERROR: handler
    },
    405: {
      METHOD_NOT_ALLOWED: handler
    }
  },
  "/v1/login": {
    400: {
      RECAPTCHA_NOT_VALID: handler,
      USER_NOT_VERIFIED: handler,
      VALIDATION_ERROR: handler,
      USER_NOT_ENABLED: handler
    },
    401: {
      UNAUTHORIZED: handler
    },
    500: {
      UNEXPECTED_ERROR: handler
    },
    405: {
      METHOD_NOT_ALLOWED: handler
    }
  }
}

const acceptOrganizationInvitation: ErrorHandlers<AxiosAcceptOrganizationInvitationErrorResponse> = {
  "/v1/acceptOrganizationInvitation": {
    400: {
      VALIDATION_ERROR: handler
    },
    401: {
      UNAUTHORIZED: handler
    },
    403: {
      FORBIDDEN: handler
    },
    404: {
      NOT_FOUND: handler
    },
    429: {
      THROTTLING: handler
    },
    500: {
      UNEXPECTED_ERROR: handler
    },
    405: {
      METHOD_NOT_ALLOWED: handler
    }
  }
}

export const ErrorHandlersProvider: FC<PropsWithChildren> = ({ children }) => {
  const demoContext = useContext(DemoContext)

  const handlers = useMemo((): ServiceErrorHandlers<GlobalServiceErrors> => {
    return {
      client: {
        CLIENT_ERROR_1: (args): void => {
          // eslint-disable-next-line no-console
          console.log("CLIENT_ERROR_1", args.error.data.message)
          // eslint-disable-next-line no-console
          console.log(demoContext?.value)
          demoContext?.setValue(demoContext.value + "ciao ")
        },
        CLIENT_ERROR_2: (args): void => {
          // eslint-disable-next-line no-console
          console.log("CLIENT_ERROR_2", args.error.data.message)
        },
        UNEXPECTED_ERROR: (args): void => {
          // eslint-disable-next-line no-console
          console.log("UNEXPECTED_ERROR", args.error.data.request)
          args.showBoundary()
        }
      },
      sdk: {
        ...acceptOrganizationInvitation,
        "/v1/login": {
          400: {
            RECAPTCHA_NOT_VALID: handler,
            USER_NOT_VERIFIED: handler,
            VALIDATION_ERROR: handler,
            USER_NOT_ENABLED: handler
          },
          401: {
            UNAUTHORIZED: handler
          },
          405: {
            METHOD_NOT_ALLOWED: handler
          },
          429: {
            THROTTLING: handler
          },
          500: {
            UNEXPECTED_ERROR: handler
          }
        }
      },
      demo: demoHandlers
    }
  }, [demoContext])

  return (<ErrorHandlersContext.Provider value={handlers}>
    {children}
  </ErrorHandlersContext.Provider>)
}
