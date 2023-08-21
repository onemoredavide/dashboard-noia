"use client"

import { FC, PropsWithChildren, useEffect } from "react"
import useAuth from "$stores/auth"
import { useRouter } from "next/navigation"
import { getPath } from "$helpers/routes"
import { useI18n } from "$i18n/client"

const AuthWrapper: FC<PropsWithChildren> = ({ children }) => {
  const user = useAuth(({ user }) => user)
  const lng = useI18n(({ lng }) => lng)
  const { replace } = useRouter()

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(user)
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (user === null || !user) {
      replace(getPath({ href: "/login", lng }))
    }
  }, [user])

  return (
    <>{children}</>
  )
}

export default AuthWrapper
