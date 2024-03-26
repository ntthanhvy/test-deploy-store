"use client"

import Image from "next/image"

import MenuBar from "@modules/common/icons/menu-bar"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import Link from "next/link"
import { useState } from "react"
import MobileMenu from "./mobile-menu"
import clsx from "clsx"

const menus = [
  {
    handle: "https://www.cakebox.com/celebration-cakes.html",
    title: "Celebration Cakes",
  },
  {
    handle: "https://www.cakebox.com/click-collect-1-hour.html",
    title: "1hr Click & Collect",
  },
  { handle: "https://www.cakebox.com/cheesecakes.html", title: "Cheesecakes" },
  { handle: "https://www.cakebox.com/treats.html", title: "Treats" },
  { handle: "https://www.cakebox.com/accessories.html", title: "Accessories" },
  { handle: "https://www.cakebox.com/franchise.html", title: "Franchise" },
  { handle: "https://www.cakebox.com/cupcakes.html", title: "Cupcakes" },
  {
    handle: "https://cake-gift-shop-green.vercel.app",
    title: "Gift",
    isNew: true,
  },
]

const subMenus = [
  {
    name: "About Us",
    href: "#about-us",
  },
  {
    name: "Store Locator",
    href: "#store-locator",
  },
  {
    name: "Delivery Infomation",
    href: "#delivery-info",
  },
  {
    name: "Contact Us",
    href: "#contact-us",
  },
  {
    name: "Become A Franchise",
    href: "https://4iu47y4umz3.typeform.com/cakebox",
  },
]

type NavProps = {
  store: any
}

export default function Nav({ store }: NavProps) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  return (
    <div className=" bg-primary-100">
      {/* banner */}
      {/* <div className="bg-primary-100 w-full py-1 text-center text-primary-700 text-xs uppercase">
        Available to collect in 1 Hour
      </div> */}

      {/* navbar */}
      <div className="max-w-8xl mx-auto flex lg:flex-nowrap items-center justify-between lg:py-5 lg:pr-5 bg-primary-100">
        {/* <div className="ml-4 flex lg:hidden items-center justify-start gap-x-4">
          <Link
            href="#"
            className="font-normal text-primary-700 text-base tracking-[0] leading-[normal] inline-flex items-center gap-2"
          >
            <Pin />
          </Link>
          <span className="w-5 h-5">
            <Search strokeWidth={2} />
          </span>
        </div> */}

        {/* logo */}
        <Link href="https://cakebox.com">
          <div className="relative w-[193px] h-[97px]">
            <Image
              src={store.logo || "/assets/images/logo.svg"}
              alt="logo"
              fill
            />
          </div>
        </Link>

        {/* search */}
        <div className="flex-1 mx-10">
          <ul className="max-w-7xl mx-auto py-4 hidden lg:flex items-center justify-start gap-8 text-primary-900">
            {menus.map((coll, index) => (
              <li key={index}>
                <Link
                  href={coll.handle}
                  className={clsx(
                    "whitespace-nowrap relative",
                    coll.isNew ? "font-bold" : ""
                  )}
                >
                  {coll.title}
                  {coll.isNew ? (
                    <span className="absolute -right-5 -top-2.5 text-2xs text-red-500 font-extrabold rotate-[25deg] font-Monsterrat">
                      NEW!
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* user menu */}

        <ul className="hidden ml-auto lg:flex items-center gap-3 px-5 xl:px-0">
          {/* <li className="xl:mr-[66px] inline-flex items-center ">
            <Link
              href="#"
              className="font-normal text-primary-700 text-base tracking-[0] leading-[normal] inline-flex items-center gap-2"
            >
              <span className="relative">
                <Image
                  src={"/assets/images/location.svg"}
                  alt="location"
                  width={32}
                  height={32}
                />
              </span>
              <span className="hidden md:block uppercase text-sm">
                Store
                <br /> Locator
              </span>
            </Link>
          </li> */}
          {/* <li>
            <Link href={"#"}>
              <span className=" relative ">
                <Image
                  alt="basket"
                  src="/assets/images/account.svg"
                  width={32}
                  height={22}
                />
              </span>
            </Link>
          </li> */}
          <li>
            {/* <Link href={"#"}> */}
            <CartDropdown />
            {/* </Link> */}
          </li>
        </ul>

        {/* <div className="lg:hidden w-full mx-5 mt-2 grow">
          <SearchBar />
        </div> */}

        <div className="flex lg:hidden items-center justify-end gap-x-4 mr-4 text-primary-700">
          {/* <Link href={"#"}> */}
          <CartDropdown />
          {/* </Link> */}
          <button className="" onClick={toggle}>
            <MenuBar />
          </button>
        </div>
      </div>

      <div className="bg-gray-200 w-full py-2 text-center text-gray-900">
        <Link
          href={"https://www.cakebox.com/reviews"}
          className="inline-flex items-center gap-2 font-semibold "
        >
          Excellent{" "}
          <span className="relative h-5 w-24">
            <Image
              src={"/assets/images/reviews/stars-4.5.svg"}
              alt="starts"
              fill
            />
          </span>
          <span className="relative h-[20px] w-[100px]">
            <Image
              src={"/assets/images/reviews/logo-black.svg"}
              alt="trust-pilot"
              fill
            />
          </span>
        </Link>
      </div>

      {/* <div className="bg-primary-100 w-full">
        <ul className=" text-center text-primary-700 max-w-7xl mx-auto py-4 hidden lg:flex items-center justify-center gap-8 font-medium text-sm">
          {subMenus.map((menu, index) => (
            <li key={index}>
              <Link href={menu.href}>{menu.name}</Link>
            </li>
          ))}
        </ul>
      </div> */}
      {/* <StaticNav /> */}

      {/* menu */}
      {/* <div className="hidden md:flex bg-primary-700">
        <ul className="max-w-7xl mx-auto py-4 hidden lg:flex items-center justify-center gap-8 uppercase text-white font-semibold">
          {menus.map((coll, index) => (
            <li key={index}>
              <Link href={coll.handle} className="whitespace-nowrap">
                {coll.title}
              </Link>
            </li>
          ))}
        </ul>
      </div> */}

      <MobileMenu open={open} onClose={toggle} menus={menus} />
    </div>
  )
}
