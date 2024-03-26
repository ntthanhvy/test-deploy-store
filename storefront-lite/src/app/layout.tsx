import Providers from "@modules/providers"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0"
        ></meta>
      </head>
      <body className="font-Monsterrat bg-primary-50">
        <Providers>
          <main className="relative">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
