import { getCollectionByHandle } from "@lib/data"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: { handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collections } = await getCollectionByHandle(params.handle)

  const collection = collections[0]

  if (!collection) {
    notFound()
  }

  return {
    title: `${collection.title} | Cakebox`,
    description: `${collection.title} collection`,
  }
}

export default async function CollectionPage({ params }: Props) {
  return <></>
}
