"use client"

import { Href } from "$types/routes"
import classNames from "classnames"
import { FC } from "react"
import TLink from "./TLink"
import styles from "$styles/components/Navbar.module.css"
import { useActiveRoute } from "$hooks/useActiveRoute"

type Props = {
  href: Href
  text: string
}

const NavItem: FC<Props> = ({ href, text }) => {
  const isActiveRoute = useActiveRoute({ href })

  return <TLink href={href} className={classNames(styles.navItem, isActiveRoute && styles.navItemActive)}>{text}</TLink>
}

export default NavItem
