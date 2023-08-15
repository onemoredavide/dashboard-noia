"use client"

import { FC } from "react"
import classNames from "classnames"
import SVG, { Props as SVGProps } from "react-inlinesvg"
import styles from "$styles/components/Icon.module.css"
import { IconName } from "$types/icon"

export interface IconProps extends Omit<SVGProps, "src"> {
  name: IconName
  size?: number
}

const Icon: FC<IconProps> = ({ name, className, size = 24, ...props }) => {
  return (
    <SVG
      className={classNames(styles.icon, className)}
      src={`/assets/icons/${name}.svg`}
      cacheRequests
      width={size}
      height={size}
      preserveAspectRatio={"xMinYMin"}
      loader={
        <svg className={classNames("inline-block", className)} style={{ width: size, height: size }} />
      }
      {...props}
    />
  )
}

export default Icon
