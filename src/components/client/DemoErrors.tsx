/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
"use client"

import styles from "$styles/components/HomeHero.module.css"
import { FC, useEffect } from "react"
import ErrorBoundaryWrapper from "./helpers/ErrorBoundaryWrapper"
import { PartialError, ServiceErrorHandlers, createError, useErrorHandler } from "$hooks/useErrorHandler"
import { AxiosAcceptOrganizationInvitationErrorResponse, AxiosAddAuctionToUserWatchlistErrorResponse, acceptOrganizationInvitation, addAuctionToUserWatchlist, login } from "sdk"
import { CustomClientError, CustomClientErrorWithoutData, UnexpectedClientError } from "$types/customErrors"

const Button: FC = () => {
  const { handleError } = useErrorHandler("button")

  return <>
    <button onClick={(): void => {
      void handleError("client", {
        error: createError<UnexpectedClientError>(new Error("test"), "UNEXPECTED_ERROR", { request: "ciao 2" })
      })
    }}>error!</button>

    <button onClick={(): void => {
      void handleError("client", {
        error: createError<CustomClientError>(new Error("test"), "CLIENT_ERROR_1", {
          message: "ciao"
        })
      })
    }}>error!</button>
  </>
}

type CustomErrorHandlers = {
  customClientErrors: CustomClientErrorWithoutData
  sdk: PartialError<AxiosAcceptOrganizationInvitationErrorResponse, 400, "VALIDATION_ERROR"> | AxiosAddAuctionToUserWatchlistErrorResponse
}

const DemoErrors: FC = () => {
  const handlers: ServiceErrorHandlers<CustomErrorHandlers> = {
    customClientErrors: {
      CLIENT_ERROR_3: (args) => {
        args.showBoundary()
      }
    },
    sdk: {
      "/v1/acceptOrganizationInvitation": {
        400: {
          VALIDATION_ERROR: (args) => {
            // eslint-disable-next-line no-console
            console.log("component")
          }
        }
      },
      "/v1/addAuctionToUserWatchlist": {
        400: {
          VALIDATION_ERROR: (args) => {},
          AUCTION_ALREADY_IN_WATCHLIST: (args) => {}
        },
        404: {
          NOT_FOUND: (args) => {}
        },
        429: {
          THROTTLING: (args) => {}
        },
        500: {
          UNEXPECTED_ERROR: (args) => {}
        },
        401: {
          UNAUTHORIZED: (args) => {}
        },
        403: {
          FORBIDDEN: (args) => {}
        },
        405: {
          METHOD_NOT_ALLOWED: (args) => {}
        }
      }
    }
  }

  const { handleError } = useErrorHandler<CustomErrorHandlers>("button", handlers)

  useEffect(() => {
    const task = async(): Promise<void> => {
      const result = await addAuctionToUserWatchlist({
        handler: {
          auctionId: 0,
          userId: 0
        }
      })

      if (result.status !== 200) {
        await handleError("sdk", {
          error: result
        })
        return
      }

      const result2 = await acceptOrganizationInvitation({
        handler: {
          agencyId: 0
        }
      })

      if (result2.status !== 200) {
        await handleError("sdk", {
          error: result2
        })
        return
      }

      const result3 = await login({
        email: "",
        password: "",
        recaptchaToken: ""
      })

      if (result3.status !== 200) {
        await handleError("sdk", {
          error: result3,
          extra: {
            id: 0
          }
        })
        return
      }
    }
    void task()
  })

  return (
    <section className={styles.container}>
      <div className="container">
        <button onClick={(): void => {
          void handleError("customClientErrors", {
            error: createError<CustomClientErrorWithoutData>(new Error("test"), "CLIENT_ERROR_3")
          })
        }}>error!</button>
        <br />
        <ErrorBoundaryWrapper id="home-hero-button">
          <Button />
        </ErrorBoundaryWrapper>
      </div>
    </section>
  )
}

export default DemoErrors
