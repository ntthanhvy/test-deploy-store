"use client"

import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import FeatureList from "./features-list"

const baseFeatures = [
  {
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "GBP",
    image: "/assets/images/cakes/cake-1.png",
    rating: 4.5,
    reviews: 1672,
    review: {
      rate: 4.5,
      count: 1672,
    },
    favorite: false,
  },
  {
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "GBP",
    image: "/assets/images/cakes/cake-2.png",
    rating: 4.5,
    reviews: 1672,
    review: {
      rate: 4.5,
      count: 1672,
    },
    favorite: true,
  },
  {
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "GBP",
    image: "/assets/images/cakes/cake-3.png",
    rating: 4.5,
    reviews: 1672,
    review: {
      rate: 4.5,
      count: 1672,
    },
    favorite: false,
  },
  {
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "GBP",
    image: "/assets/images/cakes/cake-4.png",
    rating: 4.5,
    reviews: 1672,
    review: {
      rate: 4.5,
      count: 1672,
    },
    favorite: false,
  },
  {
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "GBP",
    image: "/assets/images/cakes/cake-1.png",
    rating: 4.5,
    reviews: 1672,
    review: {
      rate: 4.5,
      count: 1672,
    },
    favorite: false,
  },
]

export default function Features() {
  const { data } = useFeaturedProductsQuery()

  return (
    <section id="features" className=" bg-primary-75 lg:-mt-10 z-[99]">
      <div className="xl:max-w-grid xl:mx-auto lg:py-10 px-5 flex flex-col items-start lg:mt-0">
        <h1 className="md:text-3xl lg:text-1.5xl font-bold text-primary-900 font-WildMango">
          Customers Favourites
        </h1>
        {/* <span className="text-xs lg:text-subtitle text-primary-900 font-normal">
          A selection of our customer favourites
        </span> */}

        {data && <FeatureList baseFeatures={data} />}
      </div>
    </section>
  )
}
