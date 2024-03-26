import Link from "next/link"

type Props = {
  category: any
}

export default function Heading({ category }: Props) {
  return (
    <section id="category-heading" className="w-full relative bg-primary-50">
      <div className="bg-hero-mobile h-[226px] md:bg-collection bg-cover bg-center md:h-[250px] lg:h-[641px] bg-primary-50">
        <div className="md:hidden bg-primary-700/20 h-full flex flex-col">
          <div className="text-center px-5 py-8 w-full">
            <h1 className="text-white font-bold text-left text-3xl">
              {category.name}
            </h1>
          </div>
          <div className="flex flex-col mt-auto px-5 py-2 text-white">
            <p className="line-clamp-3 text-xs ">{category.heading}</p>
            <Link href="#" className="ml-auto text-white text-2xs ">
              Read more
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute top-0 md:top-[40%] lg:top-1/2 inset-x-0 w-full">
        <div className="text-center py-10">
          <h1 className="text-3xl lg:text-5xl font-bold text-primary-700">
            {category.name}
          </h1>
          <p className="mt-3 lg:mt-5 uppercase text-primary-700 lg:text-xl font-medium max-w-xl mx-auto">
            {category.description}
          </p>
        </div>
      </div>

      <div className="hidden xl:max-w-grid xl:mx-auto mx-10 md:flex flex-col mt-10 lg:mt-0">
        <p className="line-clamp-2 text-sm lg:text-lg">{category.heading}</p>
        <Link href="#" className="ml-auto text-primary-700 text-sm lg:text-base">
          Read more
        </Link>
      </div>
    </section>
  )
}
