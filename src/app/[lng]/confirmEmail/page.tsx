import "server-only"

import { generateI18nStaticParams } from "$i18n/helpers"
import { ServerPage } from "$types/next"
import ConfirmEmailComponent from "$components/client/ConfirmEmail"

export const generateStaticParams = generateI18nStaticParams("/login")

const ConfirmEmail: ServerPage = async({ params }) => {
  return <ConfirmEmailComponent />
}

export default ConfirmEmail
