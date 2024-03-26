import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

const socials = [
  {
    name: "facebook",
    href: "https://www.facebook.com/Eggfreecakebox",
    icon: "/assets/images/socials/facebook.svg",
  },
  {
    name: "tiktok",
    href: "https://www.tiktok.com/@cakeboxuk",
    icon: "/assets/images/socials/tiktok.svg",
  },
  {
    name: "instagram",
    href: "https://www.instagram.com/cakeboxuk/?hl=en",
    icon: "/assets/images/socials/Insta.svg",
  },
]

const links = [
  { name: "Franchise info", href: "https://www.cakebox.com/franchise-info" },
  { name: "About Us", href: "https://www.cakebox.com/about-us" },
  { name: "FAQs", href: "https://www.cakebox.com/faqs" },
  { name: "Contact Us", href: "https://www.cakebox.com/contact-us" },
  {
    name: "Delivery information",
    href: "https://www.cakebox.com/delivery-information",
  },
  {
    name: "Terms & Conditions",
    href: "https://www.cakebox.com/terms-conditions",
  },
  { name: "Privacy Policy", href: "https://www.cakebox.com/privacy-policy" },
  { name: "Investors", href: "https://investors.eggfreecake.co.uk/" },
  { name: "Store Locator", href: "https://www.cakebox.com/storelocator" },
  { name: "Feedback", href: "https://www.cakebox.com/feedbacks" },
  { name: "Reviews", href: "https://www.cakebox.com/reviews" },
  { name: "History", href: "https://www.cakebox.com/history" },
  {
    name: "Modern Slavery Act",
    href: "https://www.cakebox.com/modern-slavery",
  },
]

const Footer = ({ noBackground = false }: { noBackground?: boolean }) => {
  return (
    <footer
      className={clsx("py-5 space-y-10 flex flex-col items-center", {
        "bg-primary-100": !noBackground,
      })}
    >
      <div className="max-w-7xl inline-flex flex-wrap items-center justify-center gap-y-2 gap-x-5 text-primary-700 text-sm font-medium">
        {links.map((link, idx) => (
          <Link key={idx} href={link.href} className="whitespace-nowrap">
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center gap-10">
        {socials.map((social) => (
          <Link href={social.href} className="relative" key={social.name}>
            <Image src={social.icon} width={32} height={32} alt={social.name} />
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center gap-5 text-primary-700  text-sm font-medium">
        <div className="flex gap-1">
          <Link href={"https://www.cakebox.com/terms-conditions"}>
            Term of Use
          </Link>
          <span>-</span>
          <Link href={"https://www.cakebox.com/privacy-policy"}>
            Privacy Policy
          </Link>
        </div>

        <span>©2024 copyright</span>

        <Link href={"https://cakebox.com"}>cakebox.com</Link>
      </div>
    </footer>
  )
}

export default Footer

function Subcriber() {
  return (
    <>
      <h3 className="w-full text-xs lg:text-xl font-bold font-WildMango text-primary-900 leading-7 lg:leading-10 inline-flex items-center justify-between md:block">
        Don{"’"}t miss a bite
        <ul className="md:hidden inline-flex items-center gap-x-2">
          {socials.map((social, index) => (
            <li key={index} className="">
              <span className="relative aspect-auto">
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={20}
                  height={20}
                />
              </span>
            </li>
          ))}
        </ul>
      </h3>
      <div className="w-full">
        <div className="w-full border border-primary-800 bg-[#FAFAFA] overflow-hidden px-2 py-2 lg:px-3 lg:py-2 rounded-xl flex items-stretch h-18">
          <input
            className="flex-1 xl:max-w-[60%] text-xs placeholder:text-xs placeholder:text-primary-700 focus:outline-none focus:ring-0 bg-transparent"
            placeholder="Enter Email"
          />

          <button className="text-sm font-normal text-primary-800 shrink-0 ml-auto">
            Subscribe
          </button>
        </div>
      </div>
    </>
  )
}
