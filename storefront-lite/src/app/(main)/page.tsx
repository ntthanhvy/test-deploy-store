import { getCollectionByHandle, getStoreDetail } from "@lib/data"
import CollectionTemplate from "@modules/collections/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: { handle: string }
}

const handle = process.env.NEXT_PUBLIC_COLLECTION_HANDLE || ""

export async function generateMetadata(): Promise<Metadata> {
  console.log(handle)
  const { collections } = await getCollectionByHandle(handle)

  const collection = collections[0]

  if (!collection) {
    notFound()
  }

  return {
    title: `${collection.title} | Cakebox`,
    description: `${collection.title} collection`,
  }
}

export default async function CollectionPage() {
  console.log(handle)
  const { collections } = await getCollectionByHandle(handle)
  const { store } = await getStoreDetail()

  const collection = collections[0]

  return <CollectionTemplate collection={collection} store={store} />
}
