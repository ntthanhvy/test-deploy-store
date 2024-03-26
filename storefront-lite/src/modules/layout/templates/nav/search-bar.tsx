"use client"

import { Popover, Transition } from "@headlessui/react"
import {
  KMCRootObject,
  KlevuDomEvents,
  KlevuFetch,
  KlevuKMCSettings,
  KlevuLastSearch,
  KlevuLastSearches,
  KlevuListenDomEvent,
  KlevuRecord,
  KlevuTypeOfRecord,
  trendingProducts as fetchTrendingProducts,
  personalisation,
  search,
  suggestions,
} from "@klevu/core"
import { verifyImage } from "@lib/verify-image"
import { debounce } from "lodash"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  ChangeEvent,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

export default function SearchBar() {
  const location = usePathname()

  const [term, setTerm] = useState("")
  const [products, setProducts] = useState<KlevuRecord[]>([])
  const [trendingProducts, setTrendingProducts] = useState<KlevuRecord[]>([])
  const [lastSearches, setLastSearches] = useState<KlevuLastSearch[]>(
    KlevuLastSearches.get()
  )
  const [suggestionsResults, setSuggestions] = useState<string[]>([])
  const [kmcSettings, setKmcSettings] = useState<KMCRootObject>()

  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    setShowSuggestions(false)
    setProducts([])
  }, [location])

  const searchModifiers = [personalisation()]

  const doSearch = async (term: string) => {
    if (term.length < 3) {
      setProducts([])
      setSuggestions([])
      return
    }

    const result = await KlevuFetch(
      search(
        term,
        {
          limit: 5,
          typeOfRecords: [KlevuTypeOfRecord.Product],
          groupBy: "id",
        },
        ...searchModifiers
      ),
      search(term, {
        id: "categories",
        limit: 5,
        typeOfRecords: [KlevuTypeOfRecord.Category],
        groupBy: "name",
      }),
      suggestions(term)
    )

    const searchResult = result.queriesById("search")
    // clickManager = searchResult.getSearchClickSendEvent()

    setProducts(searchResult?.records ?? [])
    setSuggestions(
      result
        .suggestionsById("suggestions")
        ?.suggestions.map((i) => i.suggest) ?? []
    )
    // setCategories(
    //   result.queriesById("categories")?.records.map((r) => r.name) ?? []
    // )
  }

  const fetchEmptySuggestions = async () => {
    handleLastSearchesUpdate()

    const res = await KlevuFetch(
      fetchTrendingProducts(
        {
          limit: 5,
        },
        ...searchModifiers
      )
    )
    setTrendingProducts(res.queriesById("trendingProducts")?.records ?? [])
  }

  const onSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setTerm(ev.target.value)
    debouncedChangeHandler(ev.target.value)
  }

  const debouncedChangeHandler = useMemo(() => debounce(doSearch, 300), [])

  const fetchKMCSettings = async () => {
    const settings = await KlevuKMCSettings()
    console.log(settings)
    setKmcSettings(settings.root)
  }

  useEffect(() => {
    fetchKMCSettings()

    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [])

  const handleLastSearchesUpdate = () => {
    setLastSearches(Array.from(KlevuLastSearches.get()).reverse())
  }

  useEffect(() => {
    const stop = KlevuListenDomEvent(
      KlevuDomEvents.LastSearchUpdate,
      handleLastSearchesUpdate
    )

    // cleanup this component
    return () => {
      stop()
    }
  }, [])

  // useEffect(() => {
  //   console.log({ products, suggestionsResults })
  // }, [products, suggestionsResults])

  const inputRef = useRef<HTMLInputElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const navigate = useRouter()

  const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      ev.preventDefault()
      ev.stopPropagation()

      console.log(ev.key)
      const term = ev.currentTarget.value
      if (term.length < 3) {
        return
      }
      KlevuLastSearches.save(term)
      // window.location.href = `/search?q=${term}`

      navigate.push(`/search?q=${term}`)
      setShowSuggestions(false)
    }
  }

  const genProductUrl = (product: KlevuRecord) => {
    if (process.env.NODE_ENV === "development") {
      const url = new URL(product.url)
      return url.pathname
    }

    return product.url
  }

  useEffect(() => {
    if (!showSuggestions) {
      setProducts([])
      return
    }
  }, [showSuggestions])

  return (
    <>
      <Popover className="w-full">
        {({ open }) => (
          <>
            <Popover.Button className={"hidden"} ref={btnRef}></Popover.Button>
            <div className="bg-neutral-50 text-black rounded-xl border border-primary-75 w-full relative flex items-center overflow-hidden px-3 text-sm group group-focus-within:ring-1">
              <input
                name="search"
                className="bg-transparent px-3 py-3 uppercase text-black flex-1 placeholder:text-black/70 placeholder:text-sm font-semibold rounded-l-full focus:outline-none focus:ring-0"
                placeholder="SEARCH"
                onChange={onSearchChange}
                value={term}
                ref={inputRef}
                onFocus={() => {
                  setShowSuggestions(true)
                  fetchEmptySuggestions()
                }}
                onBlur={() => setShowSuggestions(false)}
                onKeyDown={onKeyDown}
                autoComplete="off"
              />
              <span className="w-6 h-6 text-primary-700 relative ">
                <Image
                  src={"/assets/images/search.svg"}
                  fill
                  alt="search-icon"
                />
              </span>
            </div>

            <Transition
              as={Fragment}
              show={showSuggestions}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 -translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="absolute inset-x-0 w-screen z-[220] mt-1 px-4 sm:px-0 "
              >
                <div className="overflow-hidden shadow-lg ring-1 ring-black/5 max-w-[1440px] mx-auto">
                  <div className="bg-white flex divide-x divide-gray-300">
                    <div className="w-1/4 px-5 py-3 ">
                      {kmcSettings &&
                      kmcSettings.klevu_webstorePopularTerms?.length > 0 ? (
                        <div>
                          <div className="font-bold">Popular Search</div>
                          <div className="flex flex-col gap-2">
                            {kmcSettings.klevu_webstorePopularTerms.map(
                              (suggestion, idx) => (
                                <Link
                                  href={{
                                    pathname: "/search",
                                    search: `?q=${suggestion}`,
                                  }}
                                  key={idx}
                                  className="text-sm font-medium hover:cursor-pointer"
                                >
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: suggestion,
                                    }}
                                  ></span>
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      ) : null}

                      {suggestionsResults.length > 0 ? (
                        <div>
                          <div className="font-bold">Suggestion</div>
                          <div className="flex flex-col gap-2">
                            {suggestionsResults.map((suggestion, idx) => (
                              <div key={idx} className="text-sm font-medium">
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: suggestion,
                                  }}
                                ></span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {lastSearches.length > 0 ? <></> : null}
                    </div>

                    <div className="flex-1 px-5 py-3 space-y-10">
                      <div>
                        <div className="font-bold">Trending</div>
                        {trendingProducts && trendingProducts.length > 0 ? (
                          <div className="w-full flex gap-3 mt-3 justify-evenly">
                            {trendingProducts.map((product, idx) => (
                              <Link
                                href={genProductUrl(product)}
                                key={idx}
                                className="text-sm font-medium max-w-32"
                              >
                                <div className="flex flex-col gap-2">
                                  <div className="relative w-32 h-32 aspect-square rounded-lg overflow-hidden">
                                    <Image
                                      src={verifyImage(product.image)}
                                      fill
                                      alt=""
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                  <div className="flex-1 flex flex-col text-xs w-full">
                                    <span className="text-ellipsis break-words line-clamp-2">
                                      {product.name}
                                    </span>
                                    <span className="font-bold text-primary-900">
                                      {formatPrice(
                                        Number(product.price) / 100,
                                        product.currency
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      {products && products.length > 0 ? (
                        <div className="w-full">
                          <div className="font-bold">Products</div>
                          <div className="w-full flex gap-3 mt-3 justify-evenly">
                            {products.map((product, idx) => (
                              <Link
                                href={genProductUrl(product)}
                                key={idx}
                                className="text-sm font-medium max-w-32"
                              >
                                <div className="flex flex-col gap-2">
                                  <div className="relative w-32 h-32 aspect-square rounded-lg overflow-hidden">
                                    <Image
                                      src={verifyImage(product.image)}
                                      fill
                                      alt=""
                                    />
                                  </div>
                                  <div className="flex-1 flex flex-col gap-2 text-xs">
                                    <span className="line-clamp-2 ">
                                      {product.name}
                                    </span>
                                    <span className="font-bold text-primary-900">
                                      {formatPrice(
                                        Number(product.price) / 100,
                                        product.currency
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}

function formatPrice(price: number, currency = "USD") {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency,
  })
}
