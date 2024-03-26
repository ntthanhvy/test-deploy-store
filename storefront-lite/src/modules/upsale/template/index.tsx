import Footer from "../components/footer"
import Heading from "../components/heading"
import UpsaleList from "../components/upsale-list"

type Props = {
  upsales: Array<{
    id: number
    name: string
    price: number
    currencyCode: string
    image: string
  }>
}

export default function UpsaleTemplate({ upsales }: Props) {
  return (
    <>
      <Heading />

      <UpsaleList upsales={upsales} />

      <Footer />
    </>
  )
}
