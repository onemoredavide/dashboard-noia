"use client"

import { forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from "react"
import classNames from "classnames"
import styles from "$styles/components/Input.module.css"

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "prefix" | "style" | "placeholder" | "defaultValue"> & {
  type?: Extract<HTMLInputTypeAttribute, "text" | "email" | "password" | "number" | "search" | "tel">
  size?: "sm" | "md" | "lg"
  showRequiredMark?: boolean
  label?: string | null
  prefix?: ReactNode
  suffix?: ReactNode
  caption?: string
  error?: boolean | string
  placeholder?: string | null
  defaultValue?: string | null
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = "text",
  label,
  id,
  className,
  prefix,
  suffix,
  caption,
  error,
  showRequiredMark,
  readOnly,
  placeholder,
  defaultValue,
  ...props
}, ref) => {
  return <div className={className}>
    {
      !!label && <label className={styles.input__label} htmlFor={id}>
        {label}
        {showRequiredMark && <span> *</span>}
      </label>
    }
    <div className={classNames(styles.input__wrapper, {
      [styles["input__wrapper--with-prefix"]]: !!prefix,
      [styles["input__wrapper--with-suffix"]]: !!suffix,
      [styles["input__wrapper--error"]]: !!error,
      [styles["input__wrapper--readonly"]]: readOnly
    })}>
      <input
        {...props}
        readOnly={readOnly}
        ref={ref}
        type={type}
        placeholder={placeholder ?? undefined}
        defaultValue={defaultValue ?? undefined}
        className={styles.input}
      />
      {prefix && <span className={styles.input__prefix}>{prefix}</span>}
      {suffix && <div className={styles.input__suffix}>{suffix}</div>}
    </div>
    {
      (typeof error === "string" || caption) &&
        <div className={classNames(styles.input__caption, { [styles["input__caption--error"]]: !!error })}>{error || caption}</div>
    }
  </div>
})

Input.displayName = "Input"
export default Input
