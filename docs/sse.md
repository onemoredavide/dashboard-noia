# 📚 Documentation for Server-Sent Events (SSE) Store

The [`createSSEStore`](../src/stores/sse.ts) component allows managing server-sent events more effectively. Here is how you can configure and use it:

## Configuration

Firstly, you need to create the zustand SSE Store by calling [`createSSEStore`](../src/stores/sse.ts) with the correct type parameters. The example below shows how to create a store for user events:

```javascript
import { createSSEStore } from "./sse"
import { getUserSSE, GetUserSSE200ResponseSchema } from "sdk"

const userSSEStore = createSSEStore<GetUserSSE200ResponseSchema["data"], number>((userId: number) => getUserSSE({ params: { userId } }))

export default userSSEStore
```

Here, `GetUserSSE200ResponseSchema["data"]` is the type of notifications that the store will handle, and `number` is the type of initial parameters.

## Usage
Once the store is created, you can use it in your components. You can add and remove handlers for specific notification types. Here is an example of how to do this:

```javascript
import { useEffect } from "react"
import userSSEStore from "./path-to-your-user-sse-store"

// In your component
const [addHandler, removeHandler] = userSSEStore(state => [state.addHandler, state.removeHandler])

useEffect(() => {
  const handler = (): void => {
    // ... handle the event here ...
  }

  addHandler("ADDITIONAL_AUCTION_PURCHASED", handler)

  return () => {
    removeHandler("ADDITIONAL_AUCTION_PURCHASED", handler)
  }
}, [addHandler, removeHandler])
```

In the example above, a handler for the `ADDITIONAL_AUCTION_PURCHASED` event is added. The handler is removed when the component is unmounted. Be sure to include `addHandler` and `removeHandler` in the dependency array of the `useEffect` hook to ensure that the handler is properly added and removed.
