import { getStoreDetail } from "@lib/data"
import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

// Image generation
export default async function Icon() {
  const { store } = await getStoreDetail()

  return new ImageResponse(
    <img src={store.favicon} alt={store.site_name} />,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}
