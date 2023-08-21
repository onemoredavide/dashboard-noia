"use client"

import classNames from "classnames"
import { FC, ReactElement, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import styles from "$styles/components/SignupForm.module.css"
import { useClientTranslation } from "$i18n/client"
import Input from "./Input"
import Button from "./Button"
import {
  UsersService,
  ApiError
} from "$sdk"
import ErrorBox from "./ErrorBox"

type FormDataType = {
  email: string
  password: string
  firstname: string
  lastname: string
}

const SignupForm: FC = () => {
  const { control, handleSubmit } = useForm<FormDataType>()
  const { t } = useClientTranslation("signup")

  const [loading, setLoading] = useState<boolean>(false)
  const [loadingError, setLoadingError] = useState<string>()

  const onSubmit = async(data: FormDataType): Promise<void> => {
    try {
      setLoading(true)
      const { code } = await UsersService.signup({
        ...data,
        language: "it",
        urlPrefix: "http://localhost:3000",
        path: "/it/verificaEmail"
      })

      // eslint-disable-next-line no-console
      console.log(code)
    } catch (err) {
      const error = err as ApiError
      switch (error.status) {
        case 400:
          setLoadingError(`${error.message} - ${error.statusText}`)
          break
        default:
          setLoadingError("Unexpected Error")
          throw err
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loadingError ?
        <ErrorBox className="mb-6">{loadingError}</ErrorBox>
        :
        <></>
      }

      <form
        className={classNames(styles.form, loading && "opacity-50 pointer-events-none")}
        onSubmit={handleSubmit(onSubmit)}
        id="signup-form"
      >
        <Controller
          name="firstname"
          control={control}
          rules={{
            required: "Required"
          }}
          render={({ field: { onChange, value }, formState }): ReactElement => {
            return <Input
              className="mb-3"
              onChange={onChange}
              placeholder={t("FIRSTNAME")}
              type="text"
              value={value}
              error={formState.errors.firstname?.message}
            />
          }}
        />

        <Controller
          name="lastname"
          control={control}
          rules={{
            required: "Required"
          }}
          render={({ field: { onChange, value }, formState }): ReactElement => {
            return <Input
              className="mb-3"
              onChange={onChange}
              placeholder={t("LASTNAME")}
              type="text"
              value={value}
              error={formState.errors.lastname?.message}
            />
          }}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t("EMAIL_NOT_VALID")
            }
          }}
          render={({ field: { onChange, value }, formState }): ReactElement => {
            return <Input
              className="mb-3"
              onChange={onChange}
              placeholder={t("EMAIL")}
              type="email"
              value={value}
              error={formState.errors.email?.message}
            />
          }}
        />

        <Controller
          control={control}
          name={"password"}
          rules={{
            required: "Required",
            minLength: 8
          }}
          render={({ field: { onChange, value }, formState }): ReactElement =>
            <Input
              className="mb-2"
              onChange={onChange}
              placeholder="Password"
              type="password"
              value={value}
              error={formState.errors.password?.type === "minLength" ? "Password must be at least 8 characters long" : formState.errors.password?.message}
            />
          }
        />

        <div
          className="w-full flex justify-center mt-3"
        >
          <Button
            form="signup-form"
            type="submit"
            theme="primary"
            className="w-full"
          >
            {t("SUBMIT")}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
