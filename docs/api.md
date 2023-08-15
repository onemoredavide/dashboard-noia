# SDK & API

## How to install the SDK

```bash
npm i sdk@<package url>

# Example
npm i sdk@https://github.com/soluzionifutura/sandbox-api-sdk.git
```

# QueryWrapper Component

The [`QueryWrapper`](../src/components/client/helpers/QueryWrapper.tsx) is a Higher Order Component (HOC) that wraps the root component of your application. It uses the React Query library for managing and caching the API calls, and sets up the axios instance for HTTP requests.

## Configuration

Here is a detailed explanation of how to configure [`QueryWrapper`](../src/components/client/helpers/QueryWrapper.tsx):

### 1. Environment Configuration
The [`QueryWrapper`](../src/components/client/helpers/QueryWrapper.tsx) component uses the environment variable `NEXT_PUBLIC_ENVIRONMENT` to choose the appropriate API URL from [`src/constants/api.ts`](../src/constants/api.ts). Make sure to set this environment variable in your `.env.local` file corresponding to your working environment.

### 2. Retry Configuration
The retry mechanism is configured in the [`queryClient`](../src/components/client/helpers/QueryWrapper.tsx). It sets up the maximum number of retries in case a query fails. Here is an example of setting up the retry mechanism:

```javascript
export const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 2 } } });
```
In the above code, `retry: 2` means that the client will retry failed queries twice.

## Using queryClient
The [`queryClient`](../src/components/client/helpers/QueryWrapper.tsx) is an instance of QueryClient from React Query. It's used to configure the default options for the queries. In this particular setup, the [`queryClient`](../src/components/client/helpers/QueryWrapper.tsx) is passed as a prop to the [`QueryClientProvider`](../src/components/client/helpers/QueryWrapper.tsx).

To use the [`queryClient`](../src/components/client/helpers/QueryWrapper.tsx) in your components for fetching, mutating, or caching data, you can use the hooks provided by React Query like `useQuery`, `useMutation`, etc.

Here is a basic example:

```javascript
import { useQuery } from "@tanstack/react-query"

const YourComponent = () => {
  const { isLoading, error, data } = useQuery('todos', fetchTodoList)

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
```

In the above example, `todos` is the unique key for the query, and `fetchTodoList` is a function that returns a Promise that will resolve to the data.


## How to use the SDK

1. Import the function you need from the SDK

```javascript
import { LoginWithFacebook500ResponseSchema, loginWithFacebook } from "sdk"
```

2. Call the function

```javascript
const { data, status } = await loginWithFacebook({
  token,
  mfaCode: null
})
```
