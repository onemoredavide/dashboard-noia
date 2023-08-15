# Handling Errors

## Introduction

Scenario: Utilizing default global error handlers

```jsx
const Button: FC = () => {
  const { handleError } = useErrorHandler("unique-human-readable-id")

  const onSubmit = async(): Promise<void> => {
    try {
      const result = await loginAsOrganizationUser({
        email: "test@test.io",
        password: "1234556",
        recaptchaToken: "token"
      })

      if (result.status === 200) {
        // ...
      } else {
        await handleError("sdk", {
          error: result
        })
      }
    } catch(error) {
      await handleError("client", {
        error: createError<UnexpectedClientError>(error, "UNEXPECTED_ERROR", {
          request: "loginAsOrganizationUser"
        })
      })
    }
  }

  return <button onClick={onSubmit}>Login</button>
}

const LoginForm: FC = () => {
  return (
    <form>
      <ErrorBoundaryWrapper id="human-readable-unique-component-id">
        <Button />
      </ErrorBoundaryWrapper>
    </form>
  )
}
```

Scenario: Component-specific error handlers

**Yes, it's possible to overwrite a global error handler in this way**

> **Note:** The handleError function can also manage all errors defined globally (refer to the [`src/hooks/ErrorHandlersContext.tsx`](../src/components/client/helpers/ErrorHandlersContext.tsx) file).

```jsx
const Button: FC = () => {
  const { handleError } = useErrorHandler<{
    sdk: AxiosLoginAsOrganizationUserErrorResponse | AxiosLoginAsAgentErrorResponse
  }>("button", {
    sdk: {
      "/v1/loginAsOrganizationUser": {
         // ... handlers implementation ...
      },
      "/v1/loginAsAgent": {
        // ... handlers implementation ...
      }
    }
  })

  const onSubmit = async(): Promise<void> => {
    try {
      const result = await loginAsOrganizationUser({
        email: "test@test.io",
        password: "1234556",
        recaptchaToken: "token"
      })

      if (result.status === 200) {
        // ...
      } else {
        // this will call the custom handler defined above
        await handleError("sdk", {
          error: result
        })
      }
    } catch(error) {
      await handleError("client", {
        error: createError<UnexpectedClientError>(error, "UNEXPECTED_ERROR")
      })
    }
  }

  return <button onClick={onSubmit}>Send</button>
}

const LoginForm: FC = () => {
  return (
    <form>
      <ErrorBoundaryWrapper id="human-readable-unique-component-id">
        <Button />
      </ErrorBoundaryWrapper>
    </form>
  )
}
```

## Defining a New Error for Global Handling

All global error handlers are outlined in the [`src/hooks/ErrorHandlersContext.tsx`](../src/components/client/helpers/ErrorHandlersContext.tsx) file.

To incorporate a new error for global handling, you should add the error type to the  [`GlobalServiceErrors`](../src/components/client/helpers/ErrorHandlersContext.tsx) type under the relevant service name, or create a new service name.

> **NOTE:** For each service name, do not mix server and client errors. Otherwise, you will face difficulties in error handling.

Example:
```jsx
export type GlobalServiceErrors = {
  sdk: AxiosLoginAsOrganizationUserErrorResponse
  client: UnexpectedClientError
}
```

Upon adding the error type, you can utilize it in the `handleError` function. Additionally, TypeScript will assist in defining the error handlers for the new error type.[Docs](#global-error-handlers)

The error type **should** be compatible with either of these two types:
- [`ServerError`](../src/hooks/useErrorHandler.ts)
  > **NOTE:** All the error response types generated from our [OpenAPI generator](https://github.com/soluzionifutura/sf-ts-sdk-gen) are compatible with this type by default. Therefore, you don't need to define a new error type unless you wish to append additional data to the error. In such cases, you can extend the error type as outlined below.
  ```typescript
  export interface ServerError {
    path: string
    status: number|string
    data: {
      code: number|string
    }
    extra?: object
  }
  ```
  - `path`, `status`, and `data.code` are **required** and should be a constant value. You can access `data` in the handler under the `error` key.

  - `extra` can be used to define additional data to be passed to the handler when invoking the `handleError` function (you can access this data in the handler under the `data` key).

  Example:
  ```typescript

  // with a generated type from OpenAPI generator, this will require the additional data to be passed to the handler when calling the `handleError` function (as `extra` data)
  export type CustomAxiosLoginAsOrganizationUserErrorResponse = ErrorWithExtra<AxiosLoginAsOrganizationUserErrorResponse, {userId: string}>

  export interface YourError extends ServerError {
    path: "/request/path"
    status: 400
    data: {
      code: "RECAPTCHA_NOT_VALID" | "VALIDATION_ERROR"
      message?: string
    }
    extra: {
      userId: string
    }
  }
  ```
- [`ClientError`](../src/hooks/useErrorHandler.ts)
  ```typescript
  export type ClientError = Error & {
    code: string
    data?: object
  }
  ```
  - `code` is **required** and should be a constant value.
  - `data` can be used to define additional data to be passed to the handler when invoking the `handleError` function (you can access to this `data` in the handler under the `error` key.).

  Example:
  ```typescript
  // if you do not want any additional data attached to the error passed to the handler
  export type YourError = ClientError<"a string of your choice">

  // id you want to pass additional data to the handler
  export type UnexpectedClientError = ClientError<"a string of your choice", {request: string}>
  ```

### Global error handlers

The global error handlers are defined in the [`src/hooks/ErrorHandlersContext.tsx`](../src/components/client/helpers/ErrorHandlersContext.tsx) file.

The structure of the global error handlers is as follows:
```typescript
{
  [serviceName: string]: {
    [path: string]: {
      [statusCode: number]: {
        [errorCode: string]: ({error, showBoundary, resetBoundary, logError, data}) => Promise<void> | void
      }
    }
  }
}
```

Example:

```typescript
{
  sdk: {
    "/v1/loginAsOrganizationUser": {
      400: {
        "RECAPTCHA_NOT_VALID": ({error, showBoundary, resetBoundary, logError, data}) => {
          // ... handler implementation ...
        }
        // ... other error codes ...
      }
      // ... other status codes ...
    }
    // ... other paths ...
  }
  // ... other service names ...
}
```

### Arguments for Handler

The handler function receives an object as an argument, containing the following properties:
|name|type|description|
|---|---|---|
|error|`ServerError["data"]` or `ClientError`|The error object|
|showBoundary|`(error?: Error) => void`|A function to display the **`nearest`** error boundary ([`ErrorBoundaryWrapper`](#errorboundarywrapper)) [docs](https://www.npmjs.com/package/react-error-boundary)|
|resetBoundary|`() => void`|A function to reset the error boundary [docs](https://www.npmjs.com/package/react-error-boundary)|
|logError|`(error: Error) => void`|A function to log the error to the monitoring service (e.g., Sentry)|
|data|`ServerError["extra"]`|If defined, it is the additional data passed to the handler when invoking the `handleError` function|
|next|`() => void`|A function to invoke the global handler|

### Types

#### `ErrorHandlers`

The `ErrorHandlers` type is a generic type that accepts a list of error types as an argument and returns a map of error handlers.

Example:
```typescript
const sdk: ErrorHandlers<AxiosLoginAsOrganizationUserErrorResponse | AxiosLoginAsAgentErrorResponse> = {
  // ... handlers implementation ...
}
```

#### `HandlerSignature`

The `HandlerSignature` type is a generic type that accepts a list of error types as arguments and returns the signature of the handler function.

It can accept up to 3 arguments:
1. The list of error types
2. The list of status codes(*ServerError["status"]*) or codes (*ClientError["code"]*) to be used to filter the errors
3. The list of error codes (*ServerError["data"]["code"]*) to be used to filter the errors

Example:
```typescript
// this handler can be used to handle all the errors of "AxiosCheckCompleteAccountCodeErrorResponse"
const handler: HandlerSignature<AxiosCheckCompleteAccountCodeErrorResponse> = (args) => {}

// this handler can be used to handle all the errors of "AxiosCheckCompleteAccountCodeErrorResponse" with status code 400 or 500
const handler: HandlerSignature<AxiosCheckCompleteAccountCodeErrorResponse, 400|500> = (args) => {}

// this handler can be used to handle all the errors of "AxiosCheckCompleteAccountCodeErrorResponse" with status code 400 or 500 and error code "VALIDATION_ERROR" or "UNEXPECTED_ERROR"
const handler: HandlerSignature<AxiosCheckCompleteAccountCodeErrorResponse, 400|500, "VALIDATION_ERROR", "UNEXPECTED_ERROR"> = (args) => {}
```

#### `ErrorWithExtra`

The `ErrorWithExtra` type is a generic type that accepts 2 arguments:
1. a *ServerError* type
2. An object type that defines the additional data to be passed to the handler when invoking the `handleError` function (also known as the `extra` data)

Example:
```typescript
import { ErrorWithExtra } from "$hooks/useErrorHandler"

export type CustomAxiosCheckCompleteAccountCodeErrorResponse = ErrorWithExtra<AxiosCheckCompleteAccountCodeErrorResponse, {userId: string}>

// in the component
await handleError("sdk", {
  error: result,
  extra: {
    userId: "123"
  }
})

// in the handler
const handler: HandlerSignature<CustomAxiosCheckCompleteAccountCodeErrorResponse> = ({error, data}) => {
  console.log(data.userId) // "123"
}
```

#### `PartialError`

The `PartialError` type is a generic type that takes a list of error types as an argument and gives back a subset of the error types.

It can accept up to 3 arguments:
1. The list of error types
2. The list of status codes(*ServerError["status"]*) or codes (*ClientError["code"]*) to be used to filter the errors
3. The list of error codes (*ServerError["data"]["code"]*) to be used to filter the errors

```typescript
// PartialAxiosCheckCompleteAccountCodeErrorResponse is equal to AxiosCheckCompleteAccountCodeErrorResponse
type PartialAxiosCheckCompleteAccountCodeErrorResponse = PartialError<AxiosCheckCompleteAccountCodeErrorResponse>

// PartialAxiosCheckCompleteAccountCodeErrorResponse is equal to AxiosCheckCompleteAccountCodeErrorResponse with status code 400 or 500
type PartialAxiosCheckCompleteAccountCodeErrorResponse = PartialError<AxiosCheckCompleteAccountCodeErrorResponse, 400|500>

// PartialAxiosCheckCompleteAccountCodeErrorResponse is equal to AxiosCheckCompleteAccountCodeErrorResponse with status code 400 or 500 and error code "VALIDATION_ERROR" or "UNEXPECTED_ERROR"
type PartialAxiosCheckCompleteAccountCodeErrorResponse = PartialError<AxiosCheckCompleteAccountCodeErrorResponse, 400|500, "VALIDATION_ERROR", "UNEXPECTED_ERROR">
```

This helper may be useful when you want to define a handler that handles a subset of errors in a component.

Example:
```typescript
type CustomErrorHandlers = {
  sdk: PartialError<AxiosLoginAsOrganizationUserErrorResponse, 400, "VALIDATION_ERROR">
}

const { handleError } = useErrorHandler<CustomErrorHandlers>("button", {
  sdk: {
    "/v1/loginAsOrganizationUser": {
      400: {
        VALIDATION_ERROR: (args) => {
          console.log("component")
        }
      }
    }
  }
})
```

#### `PartialErrorExclude``
The `PartialErrorExclude` type is a generic type that takes a list of error types as an argument and gives back a subset of the error types.

It can accept up to 3 arguments:
1. The list of error types
2. The list of status codes(*ServerError["status"]*) or codes (*ClientError["code"]*) to be excluded from the errors
3. The list of error codes (*ServerError["data"]["code"]*) to be excluded from the errors

```typescript
// PartialAxiosCheckCompleteAccountCodeErrorResponse is equal to never, because it excludes all the errors
type PartialAxiosCheckCompleteAccountCodeErrorResponse = PartialErrorExclude<AxiosCheckCompleteAccountCodeErrorResponse>

// PartialAxiosCheckCompleteAccountCodeErrorResponse is equal to AxiosCheckCompleteAccountCodeErrorResponse without status code 400 and 500
type PartialAxiosCheckCompleteAccountCodeErrorResponse = PartialErrorExclude<AxiosCheckCompleteAccountCodeErrorResponse, 400|500>

// PartialAxiosCheckCompleteAccountCodeErrorResponse is equal to AxiosCheckCompleteAccountCodeErrorResponse with all the status codes and error codes except 400 AND "VALIDATION_ERROR"
type PartialAxiosCheckCompleteAccountCodeErrorResponse = PartialErrorExclude<AxiosCheckCompleteAccountCodeErrorResponse, 400, "VALIDATION_ERROR">
```
This helper may be useful when you want to define a handler that handles a subset of errors in a component.

Example:
```typescript
type CustomErrorHandlers = {
  sdk: PartialErrorExclude<
    PartialErrorExclude<
      AxiosChangeEmailErrorResponse,
      400,
      "VALIDATION_ERROR"
    >,
    404|429|500
  >
}

const { handleError } = useErrorHandler<CustomErrorHandlers>("button", {
  sdk: {
    "/v1/changeEmail": {
      400: {
        USER_DELETED: (args) => {},
        USER_DISABLED: (args) => {},
        USER_NOT_ENABLED: (args) => {},
        USER_ALREADY_VERIFIED: (args) => {},
      }
    }
  }
})
```

### createError
This function creates a typed error with a code.

As a generic, it accepts a `ClientError` type.pe.

It accepts 2 or 3 arguments:
1. a `Error` object
2. a `code` string
3. If defined in `ClientError["data"]`, it will be required

Example:
```typescript
import { createError } from "$hooks/useErrorHandler"

export type UnexpectedClientError = ClientError<"UNEXPECTED_ERROR", {request: string}>

const error = createError<UnexpectedClientError>(
  new Error("Ops!"),
  "UNEXPECTED_ERROR",
  {
    request: "loginAsOrganizationUser"
  }
)
```

# ErrorBoundaryWrapper

The [`ErrorBoundaryWrapper`](../src/components/client/helpers/ErrorBoundaryWrapper.tsx) is a component that provides an error boundary for its child components. This means if any child component throws an error, instead of the application crashing, the error will be caught and sent to Sentry (an open-source error tracking system that helps developers monitor and fix crashes in real time). Furthermore, a specified fallback component is rendered in place of the component that threw an error.

| Prop | Type | Required | Description |
|-|-|-|-|
| `id`              | `string`                                              | Yes      | A unique, human-readable identifier for the component. Used for error tracking in Sentry.                                         |
| `children`        | `ReactNode`                                           | Yes      | The child components that are wrapped by the `ErrorBoundaryWrapper`. If they throw an error, the fallback component is rendered. |
| `FallbackComponent` | `ComponentProps<typeof ErrorBoundary>["FallbackComponent"]` | No       | The component to render if any child component throws an error. If not provided, a `DefaultFallbackComponent` is used.          |

## Usage

```jsx
<ErrorBoundaryWrapper id="human-readable-unique-component-id">
  <ChildComponent />
</ErrorBoundaryWrapper>
```

In this example, `ChildComponent` is wrapped by `ErrorBoundaryWrapper`. If `ChildComponent` throws an error, it will be caught by `ErrorBoundaryWrapper`, an error report will be sent to Sentry (with the specified id), and the fallback component will be rendered.
