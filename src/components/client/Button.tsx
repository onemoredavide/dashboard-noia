"use client"

import classNames from "classnames"
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react"
import styles from "$styles/components/Button.module.css"
import Spinner from "./Spinner"
import { IconName } from "$types/icon"
import Icon from "./Icon"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "primary" | "secondary" | "tertiary" | "danger" | "outline-danger" | "success" | "outline-success"
  size?: "xs" | "sm" | "md" | "lg" | "full"
  loading?: boolean
  icon?: IconName
  outline?: boolean
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  theme = "primary",
  size = "md",
  loading = false,
  className,
  icon,
  type = "button",
  outline = false,
  ...props
}) => {
  if (loading && !props.disabled) {
    props.disabled = true
  }

  return <button
    className={classNames(
      styles.button,
      styles[`button--${theme}`],
      styles[`button--${size}`],
      outline && styles["button--outline"],
      className
    )}
    type={type}
    {...props}
  >
    {loading && <Spinner theme={"gray"} className={"mr-2"}/>}
    {!loading && !!icon && <Icon name={icon} size={18} className={"mr-2"}/>}
    {children}
  </button>
}

export default Button
