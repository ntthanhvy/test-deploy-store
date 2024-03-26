"use client"
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

const CarouselContext = createContext<null | {
  isDisabled: (direction: "prev" | "next") => boolean
  movePrev: () => void
  moveNext: () => void
  carousel: React.MutableRefObject<HTMLDivElement | null>
}>(null)

export const useCarouselContext = () => {
  let context = useContext(CarouselContext)

  if (context === null) {
    throw new Error("useCarouselContext must be used within a CarouselProvider")
  }

  return context
}

export default function Carousel({
  children,
  items,
}: PropsWithChildren<{ items: number }>) {
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

  const isDisabled = useCallback(
    (direction: "prev" | "next") => {
      if (direction === "prev") {
        return currentIndex <= 0
      }

      if (currentIndex >= items - 1 && direction === "next") {
        return true
      }

      if (direction === "next" && carousel.current !== null) {
        return (
          carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
        )
      }

      return false
    },
    [items, currentIndex]
  )

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
    <CarouselContext.Provider
      value={{
        moveNext,
        movePrev,
        isDisabled,
        carousel,
      }}
    >
      {children}
    </CarouselContext.Provider>
  )
}
