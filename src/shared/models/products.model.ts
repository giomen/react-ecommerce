export interface ProductModel {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: Date;
  handle: string;
  updated_at: Date;
  published_at: Date;
  template_suffix?: any;
  status: string;
  published_scope: string;
  tags: string;
  admin_graphql_api_id: string;
  variants: Variant[];
  options: Option[];
  images: Image[];
  image: Image;
  quantity?: number;
  collectionId: number;
}

export interface Variant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku?: any;
  position: number;
  inventory_policy: string;
  compare_at_price: string;
  fulfillment_service: string;
  inventory_management?: any;
  option1: string;
  option2?: any;
  option3?: any;
  created_at: Date;
  updated_at: Date;
  taxable: boolean;
  barcode?: any;
  grams: number;
  image_id?: any;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: boolean;
  admin_graphql_api_id: string;
}

export interface Option {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

export interface Image {
  id: number;
  product_id: number;
  position: number;
  created_at: Date;
  updated_at: Date;
  alt?: any;
  width: number;
  height: number;
  src: string;
  variant_ids: any[];
  admin_graphql_api_id: string;
}

export interface Image2 {
  id: number;
  product_id: number;
  position: number;
  created_at: Date;
  updated_at: Date;
  alt?: any;
  width: number;
  height: number;
  src: string;
  variant_ids: any[];
  admin_graphql_api_id: string;
}

export interface ProductResponse {
  product: ProductModel;
}

export interface ProductsResponse {
  products: ProductModel[];
}
