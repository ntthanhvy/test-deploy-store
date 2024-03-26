import Button from "@modules/common/components/button"
import Link from "next/link"

export default function Heading() {
  return (
    <div className="w-full relative ">
      <div className="w-full bg-hero-pattern-mobile h-[250px] lg:h-[300px] bg-cover bg-bottom ">
        <div className="lg:max-w-5xl mx-auto h-full lg:h-4/5 flex flex-col justify-center items-center text-center">
          <h1 className="text-2xl lg:text-5xl text-primary-700 font-bold leading-[43px]">
            Light up your cakes
          </h1>
          <p className=" text-primary-700 text-xl font-medium uppercase max-w-xl mt-5">
            Illuminate Your Celebration with Cake Accessories
          </p>

          <Link href="/checkout">
            <Button
              fill
              className="mt-5 lg:mt-10 uppercase font-medium text-subtitle !rounded-small px-10 py-2 !bg-primary-700"
            >
              GO TO CHECKOUT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
