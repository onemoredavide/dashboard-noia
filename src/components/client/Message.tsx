import classNames from "classnames"
import { FC, ReactNode } from "react"
import { IconName } from "$types/icon"
import styles from "$styles/components/Message.module.css"
import Icon from "$components/client/Icon"

type Props = {
  children?: ReactNode
  className?: string
  icon?: IconName
  iconSize?: number
  theme?: "danger" | "generic" | "info" | "success" | "warning"
  title: ReactNode
}

const Message: FC<Props> = ({
  children,
  className,
  icon = "alert-circle",
  title,
  theme = "info"
}) => {
  return (
    <div className={classNames(styles.message, className)}>
      <div className={classNames(styles.message__icon, styles[`message__icon--${theme}`])}>
        <Icon name={icon} size={30} />
      </div>

      <div className={styles.message__title}>{title}</div>

      {!!children &&
        <div className={styles.message__content}>{children}</div>
      }
    </div>
  )
}

export default Message
