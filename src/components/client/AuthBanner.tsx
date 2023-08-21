"use client"

import { FC, PropsWithChildren } from "react"
import styles from "$styles/components/AuthBanner.module.css"
import classNames from "classnames"

type Props = {
  title: string
}

const AuthBanner: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <div className={classNames(styles.wrapper)}>

      <div className={classNames(styles.shadow1)} />
      <div className={classNames(styles.shadow2)} />

      <div className={classNames(styles.container)}>
        <div className={classNames(styles.title)}>{title}</div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthBanner
