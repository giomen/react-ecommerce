export interface DefaultProductImage {
  id: any;
  created_at: Date;
  position: number;
  updated_at: Date;
  product_id: any;
  src: string;
  variant_ids: any[];
  width: number;
  height: number;
}

export interface CollectionListing {
  collection_id: any;
  updated_at: Date;
  body_html: string;
  default_product_image: DefaultProductImage;
  handle: string;
  image?: any;
  title: string;
  sort_order: string;
  published_at: Date;
}

export interface CollectionListingResponse {
  collection_listings: CollectionListing[];
}
