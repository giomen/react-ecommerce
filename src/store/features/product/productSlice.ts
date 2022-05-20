import {
  Product,
  ProductResponse,
} from '../../../shared/models/products.model';
import { StatusType } from '../../../shared/models/status.enum';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductState {
  status: StatusType;
  product: Product;
}

const initialState = {
  status: StatusType.IDLE,
  product: {},
} as ProductState;

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (url: string) => {
    const response = await fetch(url);
    return (await response.json()) as ProductResponse;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getProduct.fulfilled,
      (state: ProductState, actions: PayloadAction<ProductResponse>) => {
        state.product = actions.payload.product;
        state.status = StatusType.SUCCEDED;
      }
    );
  },
});

export default productSlice.reducer;
