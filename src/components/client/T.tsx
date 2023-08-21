"use client"

import { FC } from "react"
import { Trans } from "next-i18next"
import { useClientTranslation } from "$i18n/client"
import { Namespace } from "$types/i18n"

import TLink from "$components/client/TLink"

const components = { a: <TLink /> }
type Props = {
  content: string
  values?: {
    [key: string]: number | string
  }
  namespace?: Namespace
}

const T: FC<Props> = ({
  content,
  namespace = "common",
  values
}) => {
  const { t } = useClientTranslation(namespace)

  return (
    <Trans t={t} i18nKey={content} components={components} values={values} ns={namespace} />
  )
}

export default T
