"use client"
import { FC, PropsWithChildren, createContext, useState } from "react"

export const DemoContext = createContext<{
  value: string
  setValue: (value: string) => void }|null>(null)

export const DemoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState<string>("")

  return (<DemoContext.Provider value={{
    value,
    setValue
  }}>
    {children}
  </DemoContext.Provider>)
}
