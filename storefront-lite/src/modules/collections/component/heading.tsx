import { ProductCollection } from "@medusajs/medusa"
import Link from "next/link"

type Props = {
  collection: ProductCollection
  store: any
}

export default function CollectionHeading({ collection }: Props) {
  return (
    <section id="collection-heading" className="w-full relative bg-primary-50">
      <div
        className="h-[244px] "
        style={{
          backgroundPosition: 0,
          backgroundSize: "cover",
          backgroundImage: `url(/assets/images/backgrounds/banner.png)`,
          maskImage: `url(/assets/images/backgrounds/bg-policy.svg)`,
          maskSize: "100%",
          maskRepeat: "repeat",
          maskPosition: "320px bottom",
        }}
      ></div>

      <div className=" xl:max-w-grid xl:mx-auto mx-10 md:flex flex-col mt-10 lg:mt-5">
        <h1 className="text-3xl lg:text-5xl font-bold text-primary-700">
          {collection.title}
        </h1>
        <p className="line-clamp-2 text-sm lg:text-lg">
          {(collection.metadata?.description as string) || collection.title}
        </p>
        <Link
          href="#"
          className="ml-auto text-primary-700 text-sm lg:text-base"
        >
          Read more
        </Link>
      </div>
    </section>
  )
}
