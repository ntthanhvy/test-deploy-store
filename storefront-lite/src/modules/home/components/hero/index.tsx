import clsx from "clsx"

export default function Hero({ store }: { store: any }) {
  return (
    <section id="hero" className="block relative max-w-[1280px] mx-auto">
      {/* <div className="absolute bg-primary-100 inset-x-0 top-0 md:min-h-[435px]"></div> */}
      <div
        className={clsx(
          `max-w-[1280px] min-h-[226px] md:min-h-[602px] bg-top bg-no-repeat min-w-full w-[100vw] relative bg-hero-mobile bg-cover lg:bg-[1280px_auto] md:bg-top md:bg-hero-pattern md:drop-shadow-hero`
        )}
        style={{ backgroundImage: `url(${store.banner_image})` }}
      ></div>

      <div className="block md:hidden absolute inset-0 bg-primary-700/20 max-h-full">
        <div className="flex flex-col px-5 py-8">
          <div className="text-white font-bold text-left text-2xl font-WildMango">
            Mango &amp; Cream
            <br />
            Collection
          </div>

          <div className="mt-5">
            <button className="border-2 border-white rounded-[14px] text-white uppercase text-xs font-semibold px-4 py-2 hover:bg-white hover:text-primary-700 transition duration-300">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex max-w-[1280px] absolute z-[120] top-1/2 -translate-y-1/2 md:top-20 md:translate-y-0 lg:top-10 xl:top-20 left-0 sm:left-[4%] xl:left-[10%] px-5 sm:px-0 flex-col items-start">
        <div className="font-bold  text-primary-700 text-[64px] leading-[4rem] md:text-[64px] md:leading-[57.60px] whitespace-pre-wrap md:w-[40%] xl:w-full text-center md:text-left font-WildMango">
          Mango &amp; Cream
          <br />
          Collection
        </div>
        <p className="mt-[25px] w-full md:w-[40%] xl:w-full text-lg md:text-xl font-medium uppercase text-primary-700 md:max-w-[70%]  text-center md:text-left">
          NOTHING GOES TOGETHER BETTER THEN JUICY MANGO AND FRESH CREAM.
        </p>
        <div className="mt-8 w-full">
          <button className="py-3 rounded-2xl bg-transparent border-2 border-primary-700 text-primary-700 text-base w-full md:w-auto px-8 font-bold hover:bg-primary-700 hover:text-white transition duration-300">
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  )
}
