"use client"

import { FC, PropsWithChildren } from "react"
import Icon from "./Icon"
import classNames from "classnames"

type Props = {
  className?: string
}

const ErrorBox: FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <div className={classNames(className, "text-red-500 bg-red-50 flex items-center justify-start px-3 py-3 gap-x-3 border border-red-500 rounded-md")}>
      <div className="h-6 w-6 rounded-full border border-red-500 p-1 flex items-center justify-center font-semibold">!</div>
      <span className="border-l border-red-500 pl-3">{children}</span>
    </div>
  )
}

export default ErrorBox
