import { ComponentProps } from "react"
import { ErrorBoundary } from "react-error-boundary"

// TODO customize this component

const DefaultFallbackComponent: Exclude<ComponentProps<typeof ErrorBoundary>["FallbackComponent"], undefined> = () => {
  return <div>Something went wrong (default error boundary)</div>
}

export default DefaultFallbackComponent
