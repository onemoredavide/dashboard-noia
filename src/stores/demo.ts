import { create } from "zustand"

type DemoStore = {
  value: string | null
  setValue(value: string): void
}

const initialState = {
  value: null
}

const useDemoStore = create<DemoStore>((set) => ({
  ...initialState,
  setValue: (value: string): void => {
    set({ value })
  }
}))

export default useDemoStore
