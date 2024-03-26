import CategoryTemplate from "@modules/categories/templates/index"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: { category: string[] }
}

const mockCollection = {
  name: "Mango & Cream Collection",
  description: "Nothing goes together better then juicy Mango and fresh Cream.",
  heading:
    "Category description placeholder: SHOW 2 lines and add “read more” link to pull down the rest of the text. Placeholder: “Each day, over 1000 cake makers descend on Cake Box stores nationwide to make fresh cakes for thousands of people across the UK. Each cake is made fresh in-store with somthing else.",
  footing:
    "Category description placeholder: SHOW 2 lines and add “read more” link to pull down the rest of the text. Placeholder: “Each day, over 1000 cake makers descend on Cake Box stores nationwide to make fresh cakes for thousands of people across the UK. Each cake is made fresh in-store with somthing else.",
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

async function fetchCatefory() {
  return Promise.resolve({ product_categories: [mockCollection] })
}

async function fetchCategoryProducts() {
  return Promise.resolve(catgoryProducts)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product_categories } = await fetchCatefory().catch((err) => {
    notFound()
  })

  const category = product_categories[0]

  return {
    title: `${category.name} | Cakebox`,
    description: `${category.name} category`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { product_categories } = await fetchCatefory()
    //   params.category
    .catch((err: any) => {
      notFound()
    })

  const products = await fetchCategoryProducts()

  return (
    <CategoryTemplate categories={product_categories} products={products} />
  )
}
