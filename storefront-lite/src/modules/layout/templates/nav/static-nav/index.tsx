import { getPageBySlug } from "@lib/data"
import { useQuery } from "@tanstack/react-query"

export default function StaticNav() {
  const { data } = useQuery({
    queryKey: ["navbar"],
    queryFn: () => getPageBySlug("top-nav"),
  })

  // console.log(data?.page)
  if (!data || !data.page || data.page.children.length <= 0) return null

  const nav = data.page

  return (
    <div className="bg-primary-100 w-full">
      <ul className=" text-center text-primary-700 max-w-7xl mx-auto py-4 hidden lg:flex items-center justify-center gap-8 font-medium text-sm">
        {/* {sortBy(nav.children, (p) => p.order ).map(
          (menu: any, index: number) => (
            <li key={index}>
              <Link href={`/${menu.slug}`}>{menu.title}</Link>
            </li>
          )
        )} */}
      </ul>
    </div>
  )
}
