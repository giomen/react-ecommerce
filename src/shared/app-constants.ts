import { PARTIAL_API_PATHS } from './api-paths';
export const DOMAIN =
  'https://4ilk3v7wbk.execute-api.eu-west-1.amazonaws.com/dev';

export enum PARTIAL_ROUTE_PATHS {
  COLLECTIONS = 'collections',
  PRODUCTS = 'products',
}

export const ROUTE_PATHS = {
  COLLECTION_LISTING: `${PARTIAL_API_PATHS.collectionListing}`,
  PRODUCTS: `${PARTIAL_API_PATHS.products}`,
  PRODUCT: `${PARTIAL_API_PATHS.product}`,
};
