import { getStoreDetail } from "@lib/data"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav/index"
import { Metadata } from "next"
import dynamic from "next/dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const { store } = await getStoreDetail()

  return {
    title: store.site_name,
  }
}

const Notification = dynamic(
  () => import("@modules/layout/components/notification"),
  { ssr: false }
)

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { store } = await getStoreDetail()

  return (
    <>
      <Notification />
      <Nav store={store} />
      {children}
      <Footer />
    </>
  )
}
