import useDemoStore from "$stores/demo"
import { useState } from "react"

export const useDemo = (): {
  zustandState: string|null
  setZustandState: (demo: string) => void
  reactState: string
  setReactState: (reactState: string) => void
} => {
  const [
    zustandState,
    setZustandState
  ] = useDemoStore((state) => [state.value, state.setValue])

  const [reactState, setReactState] = useState<string>("")

  return {
    zustandState,
    setZustandState,
    reactState,
    setReactState
  }
}
