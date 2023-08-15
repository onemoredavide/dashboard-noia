import { Href, ReplaceParams } from "$types/routes"
import { getPath } from "./routes"
import { languages } from "$i18n/helpers"
import { Namespace, SupportedLanguage } from "$types/i18n"
import { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types"
import { Metadata, ResolvingMetadata } from "next"
import { getServerTranslations } from "$i18n/server"
import merge from "lodash.merge"

export const generateAlternates = ({
  currentLng,
  href,
  replaceParams
}: { currentLng: SupportedLanguage, href: Href, replaceParams?: ReplaceParams }): AlternateURLs => {
  return {
    canonical: getPath({ siteUrlPrefix: true, href, lng: currentLng, replaceParams }),
    languages: languages.reduce<Record<string, string>>((acc, lng) => {
      if (lng !== currentLng) {
        acc[lng] = getPath({ siteUrlPrefix: true, lng, href, replaceParams })
      }

      return acc
    }, {})
  }
}

export const mergeMetadata = async({
  parent,
  metadata,
  currentLng,
  ns
}: {
  parent: ResolvingMetadata
  metadata: Metadata
  currentLng: SupportedLanguage
  ns: Namespace | Namespace[]
}): Promise<Metadata> => {
  const [parentMetadata, { t }] = await Promise.all([
    parent,
    getServerTranslations(currentLng, ns)
  ])

  return merge({}, parentMetadata, {
    title: t("META.TITLE"),
    description: t("META.DESCRIPTION"),
    applicationName: t("META.APPLICATION_NAME"),
    openGraph: {
      title: t("META.TITLE"),
      description: t("META.DESCRIPTION"),
      siteName: t("META.SITE_NAME")
    },
    twitter: {
      creator: t("META.TWITTER_CREATOR"),
      title: t("META.TITLE"),
      description: t("META.DESCRIPTION")
    }
  }, metadata) as Metadata
}
