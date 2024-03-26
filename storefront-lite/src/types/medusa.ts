import {
  Address,
  Product as MedusaProduct,
  Region as MedusaRegion,
  ProductVariant,
} from "@medusajs/medusa"

export type Variant = Omit<ProductVariant, "beforeInsert"> & {
  size: string
  shape: string
  nutritic_code: string
  meta_title: string
  meta_description: string
  character_limit: number
  image_upload: boolean
}

export interface Product extends Omit<MedusaProduct, "variants"> {
  variants: Variant[]
}

export interface Region extends Omit<MedusaRegion, "beforeInsert"> {}

export type CalculatedVariant = ProductVariant & {
  calculated_price: number
  calculated_price_type: "sale" | "default"
  original_price: number
}

export type StoreLocation = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  name: string
  code: string
  address: Address
}
