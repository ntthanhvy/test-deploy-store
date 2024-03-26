"use client"

import {
  FilterManager,
  FilterManagerFilters,
  KlevuDomEvents,
  KlevuFetch,
  KlevuListenDomEvent,
  KlevuRecord,
  KlevuResponseQueryObject,
  applyFilterWithManager,
  listFilters,
  search,
  sendSearchEvent,
} from "@klevu/core"
import Button from "@modules/common/components/button"
import ProductItem from "@modules/common/components/product-item"
import ChevronDown from "@modules/common/icons/chevron-down"
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { ProductPreviewType } from "types/global"
import Filter from "../components/filter"

const manager = new FilterManager()

export default function SearchPageTemplate() {
  const searchParams = useSearchParams()
  const location = usePathname()

  const query = searchParams.get("q")

  const [searchResponse, setSearchResponse] = useState<
    KlevuResponseQueryObject | undefined
  >(undefined)
  const [filters, setFilters] = useState<FilterManagerFilters[]>([])
  const [products, setProducts] = useState<KlevuRecord[]>([])

  const initialFetch = useCallback(async () => {
    const modifiers = [
      listFilters({
        include: ["Color", "Shape", "category", "Sponge"],
        rangeFilterSettings: [
          {
            key: "klevu_price",
            minMax: true,
          },
        ],
        filterManager: manager,
      }),
      applyFilterWithManager(manager),
      sendSearchEvent(),
    ]

    const functions = [
      search(
        query ?? "",
        {
          id: "search",
          limit: 36,
          // sort: sorting,
        },
        ...modifiers
      ),
    ]
    const res = await KlevuFetch(...functions)

    const searchResult = res.queriesById("search")
    if (!searchResult) {
      return
    }

    setSearchResponse(searchResult)
    // setShowMore(searchResult.hasNextPage())
    setFilters(manager.filters)
    setProducts(searchResult.records ?? [])
  }, [query])

  const handleFilterUpdate = () => {
    // setFilters(manager.filters)
    initialFetch()
  }

  useEffect(() => {
    const stop = KlevuListenDomEvent(
      KlevuDomEvents.FilterSelectionUpdate,
      handleFilterUpdate
    )

    // cleanup this component
    return () => {
      stop()
    }
  }, [location, query])

  useEffect(() => {
    initialFetch()
  }, [query, location])

  return (
    <div className="xl:max-w-grid xl:mx-auto xl:px-5 lg:mx-7 mx-5 my-10 lg:my-0 flex items-start gap-10 lg:mt-10">
      <div className=" w-[20%]">
        <h2 className="text-xl font-bold text-primary-700">Filter</h2>

        <Filter filters={filters} manager={manager} />
      </div>

      <div className="flex-1">
        <div className="flex flex-col lg:flex-row items-start  lg:items-center justify-between w-full gap-3">
          <h1 className="text-3xl font-bold text-primary-700">
            {`Search results for "${query}"`}
          </h1>
          <div className="flex items-center gap-x-3">
            {/* <Button
              variant="primary"
              className="text-xs !py-2 !px-2 leading-none"
            >
              10 items per page
              <ChevronDown size={15} className="ml-1 lg:ml-2" />
            </Button> */}
            <Button className="text-xs !px-2 py-2">
              Sort order
              <ChevronDown size="15" className="ml-1 lg:ml-3" />
            </Button>
          </div>
        </div>
        <div className="w-full relative py-5 mx-auto">
          {products.length === 0 ? (
            <span>No results found</span>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-x-7 lg:gap-y-5 lg:py-4 lg:mx-auto lg:max-w-full place-items-center">
              {products.map((product, index) => (
                <ProductItem product={transformProduct(product)} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function transformProduct(product: KlevuRecord): ProductPreviewType {
  const { name, url, image, price, itemGroupId, ...rest } = product
  return {
    ...rest,
    id: itemGroupId,
    title: name,
    handle: new URL(url).pathname.split("/").pop() ?? "",
    thumbnail: image,
    price: {
      calculated_price: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: rest.currency,
      }).format(Number(price) / 100),
      original_price: price,
      difference: "0%",
      price_type: "default",
    },
  }
}
