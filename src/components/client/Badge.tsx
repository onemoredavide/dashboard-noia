import React from "react"
import styles from "$styles/components/Badge.module.css"
import classNames from "classnames"

type BadgeProps = {
  theme?: `${"primary" | "secondary" | "success" | "warning" | "danger" | "info"}${"" | "-opaque"}` | "light" | "dark"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  className?: string
}

const Badge: React.FunctionComponent<BadgeProps> = ({
  theme = "primary",
  size = "md",
  className,
  children
}: BadgeProps) => {
  return <div className={classNames(styles.badge, styles[`badge--${theme}`], styles[`badge--${size}`], className)}>{children}</div>
}

export default Badge
