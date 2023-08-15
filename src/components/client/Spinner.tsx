"use client"

import classNames from "classnames"
import React, { FC } from "react"
import styles from "$styles/components/Spinner.module.css"
import { sizes } from "$constants/ui"

type SpinnerProps = {
  className?: string
  theme?: "primary" | "white" | "gray"
  size?: "xs" | "sm" | "md" | "lg" | number
}

const Spinner: FC<SpinnerProps> = ({
  className,
  theme = "primary",
  size = "md"
}) => (
  <div className={classNames(styles.spinner, styles[`spinner--${theme}`], className)}>
    <svg viewBox={"0 0 50 50"} width={typeof size === "number" ? size : sizes[size]}>
      <circle cx={25} cy={25} r={20} fill={"none"} strokeWidth={5}/>
    </svg>
  </div>
)

export default Spinner
