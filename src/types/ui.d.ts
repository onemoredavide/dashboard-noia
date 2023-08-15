import type { Dispatch, SetStateAction } from "react"

export type SelectOption<T> = { label: string, value: T }
export type SetState<T> = Dispatch<SetStateAction<T>>
export type IconTheme = "success" | "danger" | "info"
