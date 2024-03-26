import { MEDUSA_BACKEND_URL } from "./config"

export function verifyImage(image: string) {
  if (["http", "https"].includes(image.split(":")[0])) {
    return image
  }

  return `${MEDUSA_BACKEND_URL}/${image}`
}
