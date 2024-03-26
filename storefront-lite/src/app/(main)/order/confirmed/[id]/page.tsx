import medusaRequest from "@lib/medusa-fetch"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { Metadata } from "next"

type Props = {
  params: { id: string }
}

async function getOrder(id: string) {
  const res = await medusaRequest("GET", `/orders/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch order: ${id}`)
  }

  return res.body
}

// async function getOrder(id: string) {
//   return Promise.resolve({
//     order: {
//       id,
//       email: "john-doe@mockmail.com",
//       code: "267-COL-000445209",
//       deliver: +id % 2 !== 0 ? "pickup" : "shipping",
//     },
//   })
// }

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "You purchase was successful",
}

export default async function CollectionPage({ params }: Props) {
  const { order } = await getOrder(params.id)

  return <OrderCompletedTemplate order={order} />
}
