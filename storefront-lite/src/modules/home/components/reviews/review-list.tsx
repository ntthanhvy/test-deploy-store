"use client"

import ChevronDown from "@modules/common/icons/chevron-down"
import clsx from "clsx"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"

export default function ReveiwList({ baseReviews }: { baseReviews: any[] }) {
  const [reviews, setReviews] = useState<typeof baseReviews>(baseReviews)

  const viewRef = useRef<HTMLDivElement | null>(null)

  const [hasNext, setHasNext] = useState<boolean>(true)

  const onNext = () => {
    if (!viewRef.current) return

    // inView.current.classList.add("-translate-x-full")
    viewRef.current.scrollBy({
      left: viewRef.current.getBoundingClientRect().width + 28,
      behavior: "smooth",
    })
    setHasNext(false)
  }

  const onPrev = () => {
    if (!viewRef.current) return

    // inView.current.classList.add("-translate-x-full")
    viewRef.current.scrollBy({
      left: -viewRef.current.getBoundingClientRect().width - 28,
      behavior: "smooth",
    })
    setHasNext(true)
  }

  return (
    <div className="mt-5 flex flex-col lg:flex-row items-center gap-x-10 xl:gap-x-20 gap-y-10">
      <div className="flex flex-col items-center ">
        <h4 className="text-black text-xl font-bold">Excellent</h4>

        <div className="mt-2 inline-flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={clsx(
                index < 4 ? "text-primary-800" : "text-primary-100"
              )}
            >
              <path
                d="M12 17.25L5.25 21L6.375 13.875L1.5 8.75L8.625 7.875L12 1.5L15.375 7.875L22.5 8.75L17.625 13.875L18.75 21L12 17.25Z"
                fill="currentColor"
              />
            </svg>
          ))}
        </div>
        <div className="mt-2 text-black text-sm">
          <span className="font-bold">4.75 </span>
          <span>average</span>
        </div>
        <div className="mt-2 text-black text-sm">
          <span className="font-bold">5,766 </span>
          <span>reviews</span>
        </div>

        <div className="mt-2 relative w-full h-[33px]">
          <Link href={"https://www.cakebox.com/reviews"}>
            <Image
              src={"/assets/images/reviews/logo-black.svg"}
              alt="trust-pilot"
              fill
            />
          </Link>
        </div>
      </div>

      <div className="w-auto flex items-center justify-between">
        <span
          className={clsx(
            "hidden md:flex rounded-full w-12 h-12 items-center justify-center text-white hover:cursor-pointer",
            !hasNext
              ? "bg-primary-700 hover:cursor-pointer "
              : "bg-zinc-300  pointer-events-none"
          )}
          onClick={onPrev}
        >
          <ChevronDown className="rotate-90" size={30} />
        </span>

        <div
          className="flex-1 flex items-center justify-start gap-x-5 overflow-hidden mx-5 xl:mx-10 "
          ref={viewRef}
        >
          <div className=" flex-none grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
            {reviews.map((review, index) => (
              <div
                className={clsx(
                  "flex-[0_0_30%] shrink-0 grow p-5 rounded-xl flex flex-col items-start",
                  review.id % 3 === 0 && "bg-primary-100",
                  review.id % 3 === 1 && "bg-yellow-100",
                  review.id % 3 === 2 && "bg-yellow-50"
                )}
                key={index}
              >
                <div className="flex items-center gap-3">
                  <h4 className="text-black text-sm font-bold">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={clsx(
                          index < review.rate
                            ? "text-primary-800"
                            : "text-primary-100"
                        )}
                      >
                        <path
                          d="M12 17.25L5.25 21L6.375 13.875L1.5 8.75L8.625 7.875L12 1.5L15.375 7.875L22.5 8.75L17.625 13.875L18.75 21L12 17.25Z"
                          fill="currentColor"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-black text-subtitle">{review.review}</p>
                <p className="w-full mt-6 text-right text-xs">{review.date}</p>
              </div>
            ))}
          </div>
          <div className="hidden flex-none  md:grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
            {reviews.map((review, index) => (
              <div
                className={clsx(
                  "flex-[0_0_30%] shrink-0 grow p-5 rounded-xl flex flex-col items-start",
                  review.id % 3 === 0 && "bg-primary-100",
                  review.id % 3 === 1 && "bg-yellow-100",
                  review.id % 3 === 2 && "bg-yellow-50"
                )}
                key={index}
              >
                <div className="flex items-center gap-3">
                  <h4 className="text-black text-sm font-bold">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={clsx(
                          index < review.rate
                            ? "text-primary-800"
                            : "text-primary-100"
                        )}
                      >
                        <path
                          d="M12 17.25L5.25 21L6.375 13.875L1.5 8.75L8.625 7.875L12 1.5L15.375 7.875L22.5 8.75L17.625 13.875L18.75 21L12 17.25Z"
                          fill="currentColor"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-black text-subtitle">{review.review}</p>
                <p className="w-full mt-6 text-right text-xs">{review.date}</p>
              </div>
            ))}
          </div>
        </div>

        <span
          className={clsx(
            "rounded-full w-12 h-12 hidden md:flex items-center justify-center text-white",
            hasNext
              ? "bg-primary-700 hover:cursor-pointer "
              : "bg-zinc-300  pointer-events-none"
          )}
          onClick={onNext}
        >
          <ChevronDown className="-rotate-90" size={30} />
        </span>
      </div>
    </div>
  )
}
