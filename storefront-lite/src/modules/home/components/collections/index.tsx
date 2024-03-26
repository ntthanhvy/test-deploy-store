import { verifyImage } from "@lib/verify-image"
import { orderBy } from "lodash"
import Image from "next/image"
import Link from "next/link"
import { CollectionData } from "types/global"

const collections = [
  {
    name: "Cakes",
    image: "/assets/images/collections/collection-1.png",
    description: "Explore our delicious offerings",
    slug: "/collections",
  },
  {
    name: "Cheesecakes",
    image: "/assets/images/collections/collection-2.png",
    description: "Explore our delicious offerings",
    slug: "/collections",
  },
  {
    name: "Cupcakes",
    image: "/assets/images/collections/collection-3.png",
    description: "Explore our delicious offerings",
    slug: "/collections",
  },
  {
    name: "Kids",
    image: "/assets/images/collections/collection-4.png",
    description: "Explore our delicious offerings",
    slug: "/collections",
  },
  {
    name: "Winter Holidays",
    image: "/assets/images/collections/collection-5.png",
    description: "Explore our delicious offerings",
    slug: "/collections",
  },
  {
    name: "Biscoff",
    image: "/assets/images/collections/collection-1.png",
    description: "Explore our delicious offerings",
    slug: "/collections",
  },
]

type CollectionsProps = {
  collections: CollectionData[]
}

export default function Collections({ collections }: CollectionsProps) {
  return (
    <section id="collections" className="">
      <div className="max-w-7xl mx-auto flex items-center py-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-8 w-full md:px-5 xl:px-0">
          {orderBy(
            collections.slice(0, 6),
            (coll) =>
              coll.metadata && coll.metadata.order
                ? Number(coll.metadata.order)
                : coll.id,
            "asc"
          ).map((collection, idx) => (
            <div key={idx} className="px-2 md:px-0">
              <Link href={`/collections/${collection.handle}`}>
                <div className="px-1.5 lg:px-3">
                  <h2 className=" text-primary-900 text-base lg:text-1.5xl font-bold font-WildMango ">
                    {collection.title}
                  </h2>
                  <span className="hidden lg:block font-normal text-primary-900 text-xs xl:text-xs">
                    {collection.title}
                  </span>
                </div>

                <div className="relative rounded-[20px] lg:mt-2 lg:rounded-md overflow-hidden w-full xl:h-[295px] aspect-[201/140]">
                  <Image
                    alt={collection.title}
                    fill
                    src={verifyImage(collection.thumbnail || collection.handle)}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
