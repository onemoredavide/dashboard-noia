"use client"

import { FC } from "react"
import styles from "$styles/components/Navbar.module.css"
import classNames from "classnames"
import useAuth from "$stores/auth"
import NavItem from "./NavItem"

const Navbar: FC = () => {
  const user = useAuth((state) => state.user)

  return (
    <header className={classNames(styles.header)}>
      <div className={classNames("container", styles.container)}>
        <NavItem href="/" text="Home" />
        {user ?
          <div className={classNames(styles.navItem)}>Logout</div>
          :
          <NavItem href="/login" text="Login" />
        }
      </div>
    </header>
  )
}

export default Navbar
