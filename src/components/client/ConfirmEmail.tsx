/* eslint-disable no-console */
"use client"

import { FC, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Spinner from "./Spinner"
import ErrorBox from "./ErrorBox"
import { ApiError } from "$sdk"

const ConfirmEmail: FC = () => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const [loading, setLoading] = useState<boolean>(true)
  const [message, setMessage] = useState<string>()

  useEffect(() => {
    void(async(): Promise<void> => {
      const code = searchParams.get("code")
      if (!code) {
        setMessage("Missing Code")
        setLoading(false)
        return
      }

      try {
        await Promise.resolve()
        replace("/")
      } catch (err) {
        const error = err as ApiError
        if (error.status === 401) {
          setMessage("Invalid code")
        }
      }
    })()
  }, [replace, searchParams])

  return (
    <>
      {loading ?
        <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center">
          <Spinner size={30} />
        </div>
        :
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
          <div>
            <ErrorBox>{message}</ErrorBox>
          </div>
        </div>
      }
    </>
  )
}

export default ConfirmEmail
