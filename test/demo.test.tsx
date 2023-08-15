import DemoErrors from "$components/client/DemoErrors"
import ErrorBoundaryWrapper from "$components/client/helpers/ErrorBoundaryWrapper"
import { useDemo } from "$hooks/useDemo"
import useDemoStore from "$stores/demo"
import { act, render, renderHook, screen } from "./utils"
import userEvent from "@testing-library/user-event"

test("zustand only", async() => {
  const value = renderHook(() => useDemoStore((state) => state.value))

  const setValue = renderHook(() => useDemoStore((state) => state.setValue))
  expect(value.result.current).toBeNull()

  act(() => {
    setValue.result.current("zustand")
  })

  expect(value.result.current).toBe("zustand")
})

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

test("react demo 1", async() => {
  render(
    <ErrorBoundaryWrapper id="jest">
      <DemoErrors />
    </ErrorBoundaryWrapper>)

  await userEvent.click(screen.getAllByText("error!")[0])

  expect(screen.getByText("Something went wrong (default error boundary)")).toBeVisible()
})

test("react demo 2", async() => {
  render(
    <ErrorBoundaryWrapper id="jest">
      <DemoErrors />
    </ErrorBoundaryWrapper>)

  await userEvent.click(screen.getAllByText("error!")[1])

  expect(screen.getByText("Something went wrong (default error boundary)")).toBeVisible()
})

test("react demo 3", async() => {
  render(
    <ErrorBoundaryWrapper id="jest">
      <DemoErrors />
    </ErrorBoundaryWrapper>)

  await userEvent.click(screen.getAllByText("error!")[2])

  expect(screen.getAllByText("error!").length).toBe(3)
})
