import Image from "next/image"

const paymentMethods = [
  {
    name: "Visa",
    image: "/assets/images/visa.png",
  },
  {
    name: "Master Card",
    image: "/assets/images/master.png",
  },
  {
    name: "Apple Pay",
    image: "/assets/images/apple-pay.png",
  },
  {
    name: "Google Pay",
    image: "/assets/images/gg-pay.png",
  },
]

export default function CheckoutFooter() {
  return (
    <footer className="py-2 lg:py-28">
      <ul className="flex items-center justify-center">
        {paymentMethods.map((payment, index) => (
          <li key={index} className="mx-5">
            <Image
              src={payment.image}
              width={payment.name === "Visa" ? 50 : 40}
              height={payment.name === "Visa" ? 50 : 40}
              alt={payment.name}
            />
          </li>
        ))}
      </ul>
    </footer>
  )
}
