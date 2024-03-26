import Carousel from "./carousel"
import ReviewList from "./review-list"

const baseReviews = [
  {
    id: 1,
    name: "Sofia",
    rate: 4.5,
    title: "Thank you for my lovely birthday card",
    review:
      "Really quick service, staff were very friendly and able to collect my offer very quickly. Cake was an absolute delight, and managed to make it go further than the listed servings",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Sofia",
    rate: 4.5,
    title: "Thank you for my birthday card",
    review:
      "Really quick service, staff were very friendly and able to collect my offer very quickly. Cake was an absolute delight, and managed to make it go further than the listed servings",
    date: "2 weeks ago",
  },
  {
    id: 3,
    name: "Sofia",
    rate: 4.5,
    title: "Thank you for my birthday card",
    review:
      "Really quick service, staff were very friendly and able to collect my offer very quickly. Cake was an absolute delight, and managed to make it go further than the listed servings",
    date: "2 weeks ago",
  },
]

export default function Reviews() {
  return (
    <section id="reviews">
      <div className="max-w-7xl mx-auto py-10 md:py-20 px-2 md:px-5 xl:px-5">
        <div className="div flex flex-col">
          <h1 className="font-WildMango text-base md:text-3xl lg:text-1.5xl text-left font-bold text-primary-900 ">
            Customers Stories
          </h1>

          <div className="hidden md:flex">
            <ReviewList baseReviews={baseReviews} />
          </div>

          <div className="md:hidden">
            <Carousel baseReviews={baseReviews} />
          </div>
        </div>
      </div>
    </section>
  )
}
