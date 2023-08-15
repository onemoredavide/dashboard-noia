"use client"

import { ComponentProps, FC, ReactNode } from "react"
import {
  ErrorBoundary
} from "react-error-boundary"
import DefaultFallbackComponent from "../DefaultErrorBoundary"
import { logSentryEvent } from "$helpers/sentry"

type Props = {
  id: string
  children: ReactNode
  FallbackComponent?: ComponentProps<typeof ErrorBoundary>["FallbackComponent"]
}

/**
 * ErrorBoundaryWrapper is a component that provides an error boundary for its children.
 * If any child component throws an error, it will be caught and sent to Sentry, and the specified fallback component will be rendered instead.
 *
 * @example
 * <ErrorBoundaryWrapper id="human-readable-unique-component-id">
 *   <ChildComponent />
 * </ErrorBoundaryWrapper>
 */
const ErrorBoundaryWrapper = ({
  id,
  children,
  FallbackComponent = DefaultFallbackComponent
}: Props): ReturnType<FC<Props>> => {
  return <ErrorBoundary
    FallbackComponent={FallbackComponent}
    onError={(error: Error & {handledException?: boolean}): void => {
      if (!error.handledException) {
        logSentryEvent(error, {
          level: "fatal",
          tags: {
            componentId: id
          }
        })
      }
    }}
  >
    {children}
  </ErrorBoundary>
}

export default ErrorBoundaryWrapper
