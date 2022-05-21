import { StatusType } from '../../../shared/models/status.enum';
import {
  ProductModel,
  ProductsResponse,
} from '../../../shared/models/products.model';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductsState {
  status: StatusType;
  products: ProductModel[];
}

const initialState = {
  status: StatusType.IDLE,
  products: [],
} as ProductsState;

export const getProductsInCollection = createAsyncThunk(
  'products/getProductsInCollection',
  async (url: string) => {
    const response = await fetch(url);
    return (await response.json()) as ProductsResponse;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getProductsInCollection.fulfilled,
      (state: ProductsState, actions: PayloadAction<ProductsResponse>) => {
        state.products = actions.payload.products;
        state.status = StatusType.SUCCEDED;
      }
    );
  },
});

export default productsSlice.reducer;
