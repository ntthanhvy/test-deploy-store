import Reviews from "@modules/home/components/reviews"
import Link from "next/link"
import Recommendations from "../../common/components/recommendation"
import CategoryProducts from "../component/category-products"
import CategoryHeading from "../component/heading"

type Props = {
  categories: any[]
  products: Array<{
    id: number
    name: string
    price: number
    currencyCode: string
    review: {
      rate: number
      count: number
    }
    image: string
  }>
}

function CategoryTemplate(props: Props) {
  const { categories, products } = props

  return (
    <>
      <CategoryHeading category={categories[0]} />
      <CategoryProducts products={products} />

      <Reviews />
      <div className="xl:max-w-grid xl:mx-auto mx-10 flex flex-col bg-primary-50">
        <p className="line-clamp-2 text-xs md:text-sm lg:text-lg">
          {categories[0].footing}
        </p>
        <Link
          href="#"
          className="ml-auto text-primary-700 text-xs md:text-sm lg:text-base"
        >
          Read more
        </Link>
      </div>

      {/* <Recommendations products={products.slice(0, 5)} /> */}
    </>
  )
}
export default CategoryTemplate
