import Play from "@modules/common/icons/play"
import Image from "next/image"

export default function Video() {
  return (
    <section id="video" className="relative">
      <div className="absolute  top-0 inset-x-0 bg-primary-75 h-1/2"></div>

      <div className="relative pt-10 lg:pt-20 flex flex-col max-w-5xl mx-auto text-center">
        <h1 className="text-lg md:text-1.5xl text-primary-900  font-bold font-WildMango">
          The Wonderful World of Cake Box
        </h1>
        <p className="text-xs md:text-base text-primary-900 font-normal">
          This is our promise
        </p>
      </div>

      <div className="relative z-[100] max-w-8xl mx-auto px-5 md:px-20  py-10 md:py-10 flex flex-col items-center justify-center">
        <div className="relative rounded-[20px] overflow-hidden xl:h-[660px] w-full xl:w-auto aspect-[18/9]">
          <Image src={"/assets/images/video.png"} fill alt="video" />

          <span className="absolute bottom-[5%] lg:bottom-[10%] left-1/2 -translate-x-1/2 bg-primary-700 w-10 h-10 md:w-20 md:h-20 xl:w-[5vw] xl:h-[5vw] p-2 md:p-4 lg:p-4 rounded-full flex items-center justify-center">
            <Play className="ml-1.5 md:ml-3" />
          </span>
        </div>
        <p className="px-10 mt-2 md:mt-8 text-center text-primary-900 text-xs leading-[15px] md:text-sm font-normal">
          Each day, over 1000 cake makers descend on Cake Box stores nationwide
          to make fresh cakes for thousands of people across the UK. Each cake
          is made fresh in-store with loving care by our expert cake makers and
          decorators. We know that every single cake has a special meaning for
          someone and we take immense pride in that. Most of our cakes come with
          a beautifully hand piped message of your choice to add a little
          personal touch. It is our mission to make every celebration a piece of
          cake.
        </p>
      </div>
    </section>
  )
}
