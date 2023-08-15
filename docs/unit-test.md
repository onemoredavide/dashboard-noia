# Testing Zustand Store, React Hooks, and React Components with Jest and React Testing Library

This guide provides a detailed walkthrough on how to test Zustand Store, React Hooks, and React Components using Jest and React Testing Library.

- [`@testing-library/user-event`](https://testing-library.com/docs/user-event/intro)
- [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro/)

## Testing Zustand Store

Zustand is a small, fast and scalable bear necessities state-management solution in React. You can test the Zustand store using `renderHook` and `act` from React Testing Library's hooks testing utilities. Here is the first example:

```javascript
test("zustand only", async() => {
  const value = renderHook(() => useDemoStore((state) => state.value))
  const setValue = renderHook(() => useDemoStore((state) => state.setValue))

  expect(value.result.current).toBeNull()

  act(() => {
    setValue.result.current("zustand")
  })

  expect(value.result.current).toBe("zustand")
})
```

In this test:

1. We are rendering hooks that retrieve `value` and `setValue` from the Zustand store.
2. We assert that the initial value is null.
3. We then use the `act` function to update the value in the store using `setValue`.
4. Finally, we assert that the value in the store is now "zustand".

## Testing Custom Hooks

Testing custom hooks in React involves similar steps, except this time we're testing the `useDemo` hook:

```javascript
test("custom hooks", async() => {
  const hook = renderHook(() => useDemo())

  expect(hook.result.current.reactState).toBe("")
  expect(hook.result.current.zustandState).toBeNull()

  act(() => {
    hook.result.current.setReactState("react")
    hook.result.current.setZustandState("zustand")
  })

  expect(hook.result.current.reactState).toBe("react")
  expect(hook.result.current.zustandState).toBe("zustand")
})
```

In this test:

1. We are rendering the `useDemo` hook.
2. We assert that the initial `reactState` is an empty string and `zustandState` is null.
3. We use the `act` function to update the states using the `setReactState` and `setZustandState` methods.
4. Finally, we assert that `reactState` is now "react" and `zustandState` is "zustand".

## Testing React Components

React components can be tested using the `render` function from React Testing Library. User interactions can be simulated using `userEvent`. Here's an example:

```javascript
test("react demo 1", async() => {
  render(
    <ErrorBoundaryWrapper id="jest">
      <DemoErrors />
    </ErrorBoundaryWrapper>
  )

  await userEvent.click(screen.getAllByText("error!")[0])

  expect(screen.getByText("Something went wrong (default error boundary)")).toBeVisible()
})
```

In this test:

1. We render the `DemoErrors` component wrapped within `ErrorBoundaryWrapper`.
2. We simulate a user clicking on the first occurrence of the text "error!".
3. We assert that the error message "Something went wrong (default error boundary)" is visible on the screen.
