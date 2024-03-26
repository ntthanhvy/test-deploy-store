import Medusa from "@medusajs/medusa-js"
import { QueryClient } from "@tanstack/react-query"
import { KLEVU_SEARCH_API_KEY, KLEVU_SEARCH_URL } from "./constants"

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0, // 1 minute
      retry: 1,
    },
  },
})

const medusaClient = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })

const klevuConfig = {
  url: KLEVU_SEARCH_URL + "/cs/v2/search",
  apiKey: KLEVU_SEARCH_API_KEY,
}

export { MEDUSA_BACKEND_URL, klevuConfig, medusaClient, queryClient }
