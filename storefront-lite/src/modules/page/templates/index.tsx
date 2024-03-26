export default function PageTemplate({ page }: { page: any }) {
  return (
    <>
      <div className="w-full relative ">
        <div className="w-full bg-hero-pattern-mobile h-[100px] lg:h-[250px] bg-cover bg-bottom ">
          <div className="lg:max-w-5xl mx-auto h-2/3 lg:h-4/5 flex flex-col justify-center items-center text-center">
            <h1 className="text-2xl lg:text-5xl text-primary-700 font-bold leading-[43px]">
              {page?.title}
            </h1>
            {/* <p className="hidden lg:block text-primary-700 text-xl font-medium uppercase max-w-xl mt-5">
              {page?.title}
            </p> */}
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 my-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 ">
            <div
              className="prose prose-sm sm:prose lg:prose-lg"
              dangerouslySetInnerHTML={{ __html: page?.body }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}
