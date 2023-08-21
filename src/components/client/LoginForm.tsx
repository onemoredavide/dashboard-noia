"use client"

import { FC, ReactElement, useState } from "react"
import classNames from "classnames"
import { useForm, Controller } from "react-hook-form"
import { useClientTranslation } from "$i18n/client"
import useAuth from "$stores/auth"
import { useRouter } from "next/navigation"
import { UsersService, ApiError } from "$sdk"
import Button from "$components/client/Button"
import Input from "$components/client/Input"
import T from "./T"
import styles from "$styles/components/LoginForm.module.css"
import ErrorBox from "./ErrorBox"
import TLink from "./TLink"

type LoginFormData = {
  email: string
  password: string
}

const LoginForm: FC = () => {
  const { t } = useClientTranslation("login")
  const onLogin = useAuth(store => store.onLogin)
  const { control, handleSubmit, formState } = useForm<LoginFormData>()
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [loginError, setLoginError] = useState<{ message: string } | null>(null)
  const { replace } = useRouter()

  const onSubmit = async({ email, password }: LoginFormData): Promise<void> => {
    setLoadingSubmit(true)

    try {
      const { data } = await UsersService.login({ email, password })

      // WIP
    } catch (err) {
      switch ((err as ApiError).status) {
        case 401:
          setLoginError({ message: t("WRONG_CREDENTIALS") })
      }
    } finally {
      setLoadingSubmit(false)
    }
  }

  return <div className="w-full text-black">
    {loginError ?
      <ErrorBox className="mb-3">
        {loginError.message}
      </ErrorBox>
      : <></>}

    <form
      id="login-form"
      onSubmit={handleSubmit(onSubmit)}
      className={classNames({
        "opacity-60 pointer-events-none": loadingSubmit
      }, styles.form)}
    >

      <Controller
        control={control}
        name={"email"}
        rules={{
          required: "Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t("EMAIL_NOT_VALID")
          }
        }}
        render={({ field: { onChange, value } }): ReactElement =>
          <Input
            className="mb-3"
            onChange={onChange}
            placeholder="Indirizzo E-mail"
            type="email"
            value={value}
            error={formState.errors.email?.message}
          />
        }
      />

      <Controller
        control={control}
        name={"password"}
        rules={{ required: "Required" }}
        render={({ field: { onChange, value } }): ReactElement =>
          <Input
            className="mb-2"
            onChange={onChange}
            placeholder="Password"
            type="password"
            value={value}
            error={formState.errors.password?.message}
          />
        }
      />

      <div
        className="w-full flex justify-center mt-3"
      >
        <Button
          form="login-form"
          type="submit"
          theme="primary"
          className="w-full"
        >
          {t("SUBMIT")}
        </Button>
      </div>
    </form>

    <div className={classNames(styles.signupCta)}>
      <div>
        <T content="SIGNUP_DESC" namespace="login" />
      </div>

      <TLink href="/signup">
        <T content="SIGNUP_CTA" namespace="login" />
      </TLink>
    </div>
  </div>
}

export default LoginForm
