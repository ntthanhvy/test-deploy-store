import UpsaleTemplate from "@modules/upsale/template"

// 10 upsale itemns
const upsales = [
  {
    id: 1,
    name: "NUMBER CANDLE 0",
    price: 249,
    currencyCode: "GBP",
    image: "/assets/images/upsales/upsale-1.png",
  },
  {
    id: 2,
    name: "NUMBER CANDLE 0",
    price: 249,
    currencyCode: "GBP",
    image: "/assets/images/upsales/upsale-2.png",
  },
  {
    id: 3,
    name: "NUMBER CANDLE 0",
    price: 249,
    currencyCode: "GBP",
    image: "/assets/images/upsales/upsale-1.png",
  },
  {
    id: 4,
    name: "NUMBER CANDLE 0",
    price: 249,
    currencyCode: "GBP",
    image: "/assets/images/upsales/upsale-2.png",
  },
  {
    id: 5,
    name: "NUMBER CANDLE 0",
    price: 249,
    currencyCode: "GBP",
    image: "/assets/images/upsales/upsale-1.png",
  },
  {
    id: 6,
    name: "NUMBER CANDLE 0",
    price: 249,
    currencyCode: "GBP",
    image: "/assets/images/upsales/upsale-2.png",
  },
  {
    id: 7,
    name: "NUMBER CANDLE 0",
    price: 249,
    currencyCode: "GBP",
    image: "/assets/images/upsales/upsale-2.png",
  },
  {
    id: 8,
    name: "NUMBER CANDLE 0",
    price: 249,
    currencyCode: "GBP",
    image: "/assets/images/upsales/upsale-1.png",
  },
  {
    id: 9,
    name: "NUMBER CANDLE 0",
    price: 249,
    currencyCode: "GBP",
    image: "/assets/images/upsales/upsale-1.png",
  },
  {
    id: 10,
    name: "NUMBER CANDLE 0",
    price: 249,
    currencyCode: "GBP",
    image: "/assets/images/upsales/upsale-2.png",
  },
]

async function getUpsales() {
  return Promise.resolve(upsales)
}

export default async function UpsalePage() {
  const data = await getUpsales()

  return <UpsaleTemplate upsales={data} />
}
