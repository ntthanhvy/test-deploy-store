"use client"

import { MEDUSA_BACKEND_URL, queryClient } from "@lib/config"
import { AccountProvider } from "@lib/context/account-context"
import { CartDropdownProvider } from "@lib/context/cart-dropdown-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import BasketProvider from "@lib/context/mock-basket-context"
import NotificationProvider from "@lib/context/notification-context"
import SearchProvider from "@lib/context/search-context"
import { StoreProvider } from "@lib/context/store-context"
import { CartProvider, MedusaProvider } from "medusa-react"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MedusaProvider
      baseUrl={MEDUSA_BACKEND_URL}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      <SearchProvider>
        <NotificationProvider>
          <CartDropdownProvider>
            <MobileMenuProvider>
              <CartProvider>
                <StoreProvider>
                  <BasketProvider>
                    <AccountProvider>{children}</AccountProvider>
                  </BasketProvider>
                </StoreProvider>
              </CartProvider>
            </MobileMenuProvider>
          </CartDropdownProvider>
        </NotificationProvider>
      </SearchProvider>
    </MedusaProvider>
  )
}
