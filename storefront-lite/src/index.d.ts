export declare module "@medusajs/medusa/dist/api/routes/store/carts/update-line-item" {
  export interface StorePostCartsCartLineItemsItemReq {
    personal_message?: string
    image?: string
  }
}

export declare module "@medusajs/medusa/dist/api/routes/store/carts/create-line-item" {
  export interface StorePostCartsCartLineItemsReq {
    personal_message?: string
    image?: string
  }
}

export declare module "@medusajs/medusa/dist/models/line-item" {
  export interface LineItem {
    personal_message?: string
    image?: string
  }
}

export declare module "@medusajs/medusa/dist/types/pricing" {
  export interface PricedProduct {
    personalized_message?: boolean
  }

  export interface PricedVariant {
    thumbnail?: string | null
  }
}
