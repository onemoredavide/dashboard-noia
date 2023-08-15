// https://docs.pmnd.rs/zustand/guides/testing#jest

import * as zustand from "zustand"
import { act } from "@testing-library/react"

const { create: actualCreate, createStore: actualCreateStore } = jest.requireActual<typeof zustand>("zustand")

// a variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set<() => void>()

// when creating a store, we get its initial state, create a reset function and add it in the set
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/ban-types
export const create = (<T extends unknown>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate(stateCreator)
  const initialState = store.getState()
  storeResetFns.add(() => {
    store.setState(initialState, true)
  })
  return store
}) as typeof zustand.create

// mock for createStore
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/ban-types
export const createStore = (<T extends unknown>() => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return (stateCreator: zustand.StateCreator<T>) => {
    const store = actualCreateStore(stateCreator)
    const initialState = store.getState()
    storeResetFns.add(() => {
      store.setState(initialState, true)
    })
    return store
  }
}) as typeof zustand.createStore

// reset all stores after each test run
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn()
    })
  })
})
