export const IS_BROWSER = typeof window !== "undefined"
export const GG_API_KEY = process.env.NEXT_PUBLIC_GG_AUTOCOMPLETE_API || ""
export const GG_DISTANCE_KEY = process.env.NEXT_PUBLIC_GG_DISTANCE_API || ""
export const IS_METRIC = process.env.NEXT_PUBLIC_IS_METRIC === "true"

export const KLEVU_SEARCH_URL = process.env.NEXT_PUBLIC_KLEVU_SEARCH_URL || ""
export const KLEVU_SEARCH_API_KEY =
  process.env.NEXT_PUBLIC_KLEVU_SEARCH_API_KEY || ""

export const HQ_STORE_CODE = process.env.NEXT_PUBLIC_STORE_CODE || ""
