"use client"

import { environment } from "$constants/env"
import { Env, setup } from "sdk"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import axios from "axios"
import { FC, PropsWithChildren } from "react"

export const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 2 } } })

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: environment === "local" ? {
    "X-Local-Test": true
  } : undefined
})

if (typeof window !== "undefined") {
  setup({
    axios: axiosInstance,
    env: environment as Env,
    ES: EventSource
  })
}

const QueryWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
}

export default QueryWrapper
