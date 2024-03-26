"use client"

import { Transition } from "@headlessui/react"
import Link from "next/link"

type Props = {
  open: boolean
  onClose: () => void
  menus: any[]
}

export default function MobileMenu({ open, onClose, menus }: Props) {
  return (
    <Transition
      show={open}
      className="w-full bg-primary-700 origin-top"
      enter="transion duration-300"
      enterFrom="opacity-0 h-0"
      enterTo="opacity-100 h-auto"
      leave="transition duration-100"
      leaveFrom="opacity-100 h-auto"
      leaveTo="opacity-0 h-0"
    >
      <ul
        className="bg-primary-700 text-white uppercase font-semibold divide-y divide-primary-50/25"
        onClick={onClose}
      >
        {menus.map((menu, index) => (
          <li key={index} className="py-4 text-center">
            <Link href={menu.handle} className="whitespace-nowrap">
              {menu.title}
            </Link>
          </li>
        ))}
      </ul>
    </Transition>
  )
}
