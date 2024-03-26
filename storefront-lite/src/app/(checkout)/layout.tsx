import { CheckoutProvider } from "@lib/context/checkout-context"
import CheckoutStep from "@modules/checkout/templates/checkout-step"
import CheckoutFooter from "@modules/layout/templates/checkout-footer"
import BasketNav from "@modules/layout/templates/nav/basket-nav"
import CheckoutNav from "@modules/layout/templates/nav/checkout-nav"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CheckoutProvider>
      <BasketNav />
      <CheckoutStep />
      {children}
      {/* <CheckoutFooter /> */}
    </CheckoutProvider>
  )
}
