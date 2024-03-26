"use client"

import { useStore } from "@lib/context/store-context"
import { verifyImage } from "@lib/verify-image"
import { LineItem, Region } from "@medusajs/medusa"
import LineItemPrice from "@modules/common/components/line-item-price"
import clsx from "clsx"
import { groupBy } from "lodash"
import { formatAmount } from "medusa-react"
import Image from "next/image"
import { useMemo } from "react"

type BasketItemProps = {
  items: Omit<LineItem, "beforeInsert">[] | undefined
  region?: Region | undefined
}

export default function BasketItem({ items, region }: BasketItemProps) {
  // const { baskets, deleteBasket } = useMockBasket()
  const { deleteItem, updateItem } = useStore()

  const onAddQuantity = (item: Omit<LineItem, "beforeInsert">) => {
    if (item.quantity < item.variant.inventory_quantity) {
      updateItem({
        lineId: item.id,
        quantity: item.quantity + 1,
      })
    }
  }

  const onSubtractQuantity = (item: Omit<LineItem, "beforeInsert">) => {
    if (item.quantity > 1) {
      updateItem({
        lineId: item.id,
        quantity: item.quantity - 1,
      })
    }
  }

  const brownieBox = useMemo<
    Array<{
      items: Omit<LineItem, "beforeInsert">[]
      boxId: string
      boxQuantity: number
      boxType: number | string
      title: string
      thumbnail: string
      total: number
    }>
  >(() => {
    if (!items) return []

    const boxItems = items.filter((item) => item.metadata.boxId)
    const boxes = groupBy(boxItems, (item) => item.metadata.boxId)

    // console.log(boxes)

    return Object.entries(boxes).map(([boxId, items]) => {
      const product = items[0].variant.product as {
        title: string
        thumbnail: string
      }
      const metadata = items[0].metadata as {
        boxQuantity: number
        boxType: number
      }

      return {
        ...product,
        ...metadata,
        boxId,
        items,
        total: items.reduce(
          (acc, item) => acc + item.quantity * item.unit_price,
          0
        ),
      }
    })
  }, [items])

  const notBox = useMemo(() => {
    return items?.filter((item) => !item.metadata.boxId) || []
  }, [items])

  const removeBox = (boxId: string) => () => {
    const boxItems =
      items?.filter((item) => item.metadata.boxId === boxId) || []

    boxItems.forEach((item) => {
      deleteItem(item.id)
    })
  }

  return (
    <>
      {items && region && (
        <>
          {brownieBox.map((box, index) => (
            <div
              className="w-full max-w-full flex flex-wrap gap-x-5 items-stretch border-2 border-primary-100 rounded-small p-3 lg:p-5 shadow-card relative overflow-hidden"
              key={index}
            >
              <span
                className="absolute top-1 right-2 text-primary-700 uppercase font-extrabold leading-normal hover:cursor-pointer"
                onClick={removeBox(box.boxId)}
              >
                X
              </span>
              <div className="shrink-0 relative rounded-lg lg:rounded-default overflow-hidden w-[70px] h-[72px] lg:w-[92px] lg:h-[94px] ">
                <Image
                  src={verifyImage(box.thumbnail ?? "")}
                  alt="new-box"
                  fill
                />
              </div>

              <div className="flex-1 flex flex-wrap h-full">
                <div className="flex flex-col flex-1 w-full lg:w-auto flex-shrink-0 grow">
                  <h4 className="text-primary-700 font-medium uppercase lg:leading-normal text-sm lg:text-base ">
                    Brownie Box
                  </h4>
                  <p className="text-sm">
                    {box.boxQuantity} box of {box.boxType}
                  </p>
                  <p className="mt-2 text-primary-700 text-sm font-normal inline-flex items-center gap-x-2">
                    <ul className="w-full">
                      {box.items.map((item: any) => (
                        <li
                          key={item.id}
                          className="w-full gap-10 flex items-center justify-between"
                        >
                          <span>{item.variant.title}</span>{" "}
                          <span className="ml-auto">x {item.quantity}</span>
                          <span className="ml-5">
                            {formatAmount({
                              amount: item.quantity * item.unit_price,
                              region,
                            })}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </p>
                  <p className="text-right mt-2 font-medium text-primary-700">
                    {formatAmount({
                      amount: box.total,
                      region,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {notBox.map((item, index) => (
            <div
              className="w-full max-w-full flex flex-wrap lg:flex-nowrap gap-x-3 items-stretch border-2 border-primary-100 rounded-small overflow-hidden p-3 lg:p-5 shadow-card relative"
              key={index}
            >
              <span
                className="absolute top-1 right-2 text-primary-700 uppercase font-extrabold leading-normal hover:cursor-pointer"
                onClick={() => deleteItem(item.id)}
              >
                X
              </span>
              <div className="shrink-0 relative rounded-lg lg:rounded-default overflow-hidden w-[70px] h-[72px] lg:w-[92px] lg:h-[94px] ">
                <Image
                  src={verifyImage(item.thumbnail ?? "")}
                  alt="new-basket-item"
                  fill
                />
              </div>
              <div className="flex-1 flex flex-wrap">
                <div className="flex flex-col flex-1 lg:h-[94px] w-full lg:w-auto flex-shrink-0 grow">
                  <h4 className="text-primary-700 font-medium uppercase lg:leading-normal text-sm lg:text-base ">
                    {item.title}
                  </h4>
                  <p className="text-black text-[13px] font-medium">
                    Product Code: {item.variant.sku}
                  </p>
                  <p className="text-primary-700 text-subtitle font-normal mt-auto inline-flex items-center gap-x-2">
                    <span>{item.variant.options?.[0]?.value}</span>
                    {item.variant.options?.length > 1 && (
                      <>
                        <span className="text-lg">|</span>
                        <span>
                          {item.variant.options[1]?.value}
                          {/* {'"'} serves {item.variant.options[1].value} */}
                        </span>
                      </>
                    )}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex w-1/2 grow shrink-0 flex-col items-center justify-center gap-y-2 min-w-[135px] ">
                    <span className="text-subtitle text-primary-700">
                      Quantity
                    </span>
                    <div className="border border-black rounded-full p-1.5 flex items-center justify-between">
                      <button
                        className={clsx(
                          "rounded-full w-7 h-7 bg-primary-800 text-white flex items-center justify-center font-bold text-lg hover:cursor-pointer disabled:bg-zinc-300 disabled:text-black disabled:pointer-events-none"
                        )}
                        onClick={() => onSubtractQuantity(item)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="px-5 font-bold">{item.quantity}</span>
                      <span
                        className="rounded-full w-7 h-7 bg-primary-800 text-white flex items-center justify-center font-bold text-lg hover:cursor-pointer  disabled:bg-zinc-300 disabled:text-black disabled:pointer-events-auto"
                        onClick={() => onAddQuantity(item)}
                      >
                        +
                      </span>
                    </div>
                    <button
                      className="font-semibold text-[#929292] text-[13px] uppercase leading-normal "
                      onClick={() => deleteItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="lg:ml-5 flex items-center justify-center">
                    <span className="text-primary-700 text-[22px] font-medium uppercase leading-normal ">
                      <LineItemPrice item={item} region={region} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  )
}
