import { getPageBySlug } from "@lib/data"
import PageTemplate from "@modules/page/templates"
import { notFound } from "next/navigation"

export default async function PageSlug({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const { page } = await getPageBySlug(slug).catch((err) => {
    console.log(err)
    notFound()
  })

  return <PageTemplate page={page} />
}
