import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav/index"
import dynamic from "next/dynamic"
import React, { PropsWithChildren } from "react"

const Notification = dynamic(
  () => import("@modules/layout/components/notification"),
  { ssr: false }
)

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Notification />
      <Nav store={{}} />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
