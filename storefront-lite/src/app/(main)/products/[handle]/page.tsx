import { getProductByHandle } from "@lib/data"
import BrownieBoxTemplate from "@modules/products/templates/brownie-box"
import ProductTemplate from "@modules/products/templates/index"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: { handle: string }
}

const product = {
  id: 1,
  title: "Mango Fruit Fusion",
  price: 3499,
  currencyCode: "GBP",
  review: {
    rate: 4,
    count: 10,
  },
  thumbnail: "/assets/images/cake/image-1.png",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  images: [
    "/assets/images/cake/image-1.png",
    "/assets/images/cake/image-2.png",
    "/assets/images/cake/image-3.png",
    "/assets/images/cake/image-4.png",
  ],
  collection: {
    name: "Mango & Cream Collection",
    subTitle: "Nothing goes together better then juicy Mango and fresh Cream.",
  },
}

const catgoryProducts = [
  {
    id: 1,
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "GBP",
    review: {
      rate: 4.5,
      count: 1572,
    },
    image: "/assets/images/cakes/cake-1.png",
  },
  {
    id: 2,
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "GBP",
    review: {
      rate: 4.5,
      count: 1572,
    },
    image: "/assets/images/cakes/cake-2.png",
  },
  {
    id: 3,
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "GBP",
    review: {
      rate: 4.5,
      count: 1572,
    },
    image: "/assets/images/cakes/cake-3.png",
  },
  {
    id: 4,
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "GBP",
    review: {
      rate: 4.5,
      count: 1572,
    },
    image: "/assets/images/cakes/cake-4.png",
  },
  {
    id: 5,
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "GBP",
    review: {
      rate: 4.5,
      count: 1572,
    },
    image: "/assets/images/cakes/cake-5.png",
  },
  {
    id: 6,
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "GBP",
    review: {
      rate: 4.5,
      count: 1572,
    },
    image: "/assets/images/cakes/cake-6.png",
  },
  {
    id: 7,
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "GBP",
    review: {
      rate: 4.5,
      count: 1572,
    },
    image: "/assets/images/cakes/cake-7.png",
  },
  {
    id: 8,
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "GBP",
    review: {
      rate: 4.5,
      count: 1572,
    },
    image: "/assets/images/cakes/cake-8.png",
  },
  {
    id: 9,
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "GBP",
    review: {
      rate: 4.5,
      count: 1572,
    },
    image: "/assets/images/cakes/cake-9.png",
  },
  {
    id: 10,
    name: "Red Velvet Chocolate Cake",
    price: 3900,
    currencyCode: "USD",
    review: {
      rate: 4.5,
      count: 1572,
    },
    image: "/assets/images/cakes/cake-1.png",
  },
]

async function getProduct() {
  return Promise.resolve({ products: [product] })
}

async function getSuggestProducts() {
  return Promise.resolve({ products: catgoryProducts })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getProductByHandle(params.handle)

  const product = data.products[0]

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Cakebox`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Cakebox`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { products } = await getProductByHandle(params.handle).catch((err) => {
    console.log(err)
    return notFound()
  })

  // console.log(products[0].metadata)

  if (products[0].metadata?.product_type === "brownie") {
    return <BrownieBoxTemplate product={products[0]} />
  }

  return <ProductTemplate product={products[0]} />
}
