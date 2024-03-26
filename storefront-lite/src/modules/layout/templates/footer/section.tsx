"use client"

import { getPageBySlug } from "@lib/data"
import { useQuery } from "@tanstack/react-query"
import { sortBy } from "lodash"
import Link from "next/link"

export default function Section({ slug }: { slug: string }) {
  const { data } = useQuery({
    queryKey: [slug],
    queryFn: () => getPageBySlug(slug),
  })

  // console.log(data?.page)
  if (!data || !data.page) return null

  const page = data.page
  // console.log({ page })

  return (
    <div className="flex flex-col items-start">
      <h4 className="font-bold text-sm lg:text-base text-primary-900">
        {page.title}
      </h4>

      <ul className="mt-1 lg:mt-2 text-primary-900 text-xs lg:text-sm font-semibold">
        {sortBy(page.children, (p) => p.order).map(
          (subPage: any, idx: number) => (
            <li key={idx} className="leading-5 lg:leading-6">
              <Link href={subPage.slug}>{subPage.title}</Link>
            </li>
          )
        )}
      </ul>
    </div>
  )
}
