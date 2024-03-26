"use client"

import ChevronDown from "@modules/common/icons/chevron-down"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function Carousel({ baseReviews }: { baseReviews: any[] }) {
  const maxScrollWidth = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carousel = useRef<HTMLDivElement | null>(null)

  const movePrev = () => {
    console.log(currentIndex)
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1)
    }
  }

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1)
    }
  }

  const isDisabled = (direction: "prev" | "next") => {
    if (direction === "prev") {
      return currentIndex <= 0
    }

    if (currentIndex >= baseReviews.length - 1 && direction === "next") {
      return true
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      )
    }

    return false
  }

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex
    }
  }, [currentIndex])

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0
  }, [])

  return (
    <>
      <div className="flex items-start gap-x-3 mt-4">
        <div className="shrink-0 flex flex-col items-center">
          <h2 className="text-xl">Excellent</h2>

          <div className="mt-2 relative w-full h-5 aspect-auto block">
            <Image
              src={"/assets/images/reviews/stars-5.svg"}
              fill
              alt="reviews"
            />
          </div>

          <div className="mt-1">
            <p className="text-2xs">
              Base on <span className="underline">14,092 reviews</span>
            </p>
          </div>

          <div className="mt-2 relative w-full h-6">
            <Image
              src={"/assets/images/reviews/logo-black.svg"}
              alt="logo"
              fill
            />
          </div>
        </div>

        <div className="w-[67%] grow-0 flex-1 flex items-center justify-between gap-4 relative">
          <button
            className={clsx(
              "absolute rounded-full w-6 h-6 p-1 flex items-center justify-center text-zinc-300 border border-zinc-300 bg-primary-700 hover:cursor-pointer disabled:bg-zinc-300 z-[90]"
            )}
            onClick={movePrev}
            disabled={isDisabled("prev")}
          >
            <ChevronDown className="rotate-90" size={30} />
          </button>

          <div className="px-11 overflow-hidden relative">
            <div
              className="relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
              ref={carousel}
            >
              {baseReviews.map((review, index) => (
                <div
                  className="shrink-0 w-[190px] snap-start flex flex-col items-start gap-1 text-2xs"
                  key={index}
                >
                  <div className="w-full">
                    <div className="relative">
                      <Image
                        src={"/assets/images/reviews/stars-5.svg"}
                        alt="reviews"
                        width={70}
                        height={12}
                      />
                    </div>
                  </div>
                  <h4 className="font-bold line-clamp-1 overflow-ellipsis">
                    {review.title}
                  </h4>
                  <p className=" line-clamp-3 overflow-ellipsis">
                    {review.review}
                  </p>

                  <span>
                    <span className="font-bold text-zinc-400">
                      {review.name},{" "}
                    </span>
                    <span>{review.date}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            className={clsx(
              "absolute right-0 rounded-full w-6 h-6 p-1 flex items-center justify-center text-zinc-300 hover:cursor-pointer  bg-primary-700 border border-zinc-300 disabled:bg-zinc-300 z-[90]"
            )}
            onClick={moveNext}
            disabled={isDisabled("next")}
          >
            <ChevronDown className="-rotate-90" size={30} />
          </button>
        </div>
      </div>
    </>
  )
}
