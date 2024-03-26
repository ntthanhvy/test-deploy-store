import Footer from "@modules/layout/templates/footer"
import BasketNav from "@modules/layout/templates/nav/basket-nav"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BasketNav />
      {children}
      <Footer noBackground />
    </>
  )
}
