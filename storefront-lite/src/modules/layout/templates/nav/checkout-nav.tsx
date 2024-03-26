import Image from "next/image"
import Link from "next/link"

export default function CheckoutNav() {
  return (
    <div className="relative w-screen">
      <div className="bg-checkout bg-cover bg-bottom h-[120px] lg:h-[244px] w-full relative">
        <Link href="https://cakebox.com">
          <div className="lg:py-16 relative w-[120px] lg:w-[193px]  lg:h-[97px] aspect-[4/3] h-auto">
            <Image
              src={"/assets/images/logo.svg"}
              fill
              alt="logo"
              sizes="(max-width: 640px) 100vw, 100px"
            />
          </div>
        </Link>

        <div className="absolute top-2/3 lg:top-1/2 text-center -translate-y-1/2 w-full">
          <h1 className="text-3xl lg:text-6xl font-bold text-primary-700">
            Checkout
          </h1>
        </div>
      </div>
    </div>
  )
}
