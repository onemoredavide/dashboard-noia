/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client"

import { useI18n } from "$i18n/client"
import { getPath } from "$helpers/routes"
import { SupportedLanguage } from "$types/i18n"
import { default as NextLink, LinkProps as NextLinkProps } from "next/link"
import React, { AnchorHTMLAttributes, FC, PropsWithChildren, useRef } from "react"
import { Href, ReplaceParams } from "$types/routes"
import MailTo from "$components/client/MailTo"

type TLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &  Omit<NextLinkProps, "href" | "locale"> & {
  href?: Href
  locale?: SupportedLanguage
  replaceParams?: ReplaceParams
}

const TLink: FC<PropsWithChildren<TLinkProps>> = ({ children, locale, href, replaceParams, ...props }) => {
  const external = useRef<boolean>(href!.startsWith("http") || href!.startsWith("mailto:") || href!.startsWith("tel:")).current
  const email = useRef<string | null>(href!.startsWith("mailto:") ? href!.substring(7) : null).current
  const lng = useI18n(({ lng }) => lng)

  if (email) {
    return <MailTo email={email}>{children}</MailTo>
  }

  return (
    <NextLink href={external ? href! : getPath({ href: href!, lng: locale || lng, replaceParams })} {...props}>
      {children}
    </NextLink>
  )
}

export default TLink
