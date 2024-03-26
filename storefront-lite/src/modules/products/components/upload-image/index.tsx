import { useProductActions } from "@lib/context/product-context"
import Button from "@modules/common/components/button"
import Image from "next/image"
import { useRef } from "react"

export default function VariantImageUpload() {
  const inputRef = useRef<HTMLInputElement>(null)

  const { lineImage, setLineImage } = useProductActions()

  return (
    <div className="flex justify-between items-start py-4">
      <Button onClick={() => inputRef.current?.click()}>Upload Image</Button>

      {lineImage && lineImage.url ? (
        <div className="relative w-32 h-32">
          <Image
            src={lineImage.url}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={lineImage.name ?? "Line Image"}
          />
        </div>
      ) : null}

      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            setLineImage({
              name: file.name,
              nativeFile: file,
              url: URL.createObjectURL(file),
              size: file.size,
            })
          }
        }}
        ref={inputRef}
        className="hidden"
      />
    </div>
  )
}
