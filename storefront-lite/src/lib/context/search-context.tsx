import { KlevuConfig, KlevuKMCSettings } from "@klevu/core"
import { KLEVU_SEARCH_API_KEY, KLEVU_SEARCH_URL } from "@lib/constants"
import axios from "axios"
import { PropsWithChildren } from "react"

KlevuConfig.init({
  url: KLEVU_SEARCH_URL + "/cs/v2/search",
  apiKey: KLEVU_SEARCH_API_KEY,
  axios,
})

KlevuKMCSettings()

export default function SearchProvider({ children }: PropsWithChildren) {
  return <>{children}</>
}
