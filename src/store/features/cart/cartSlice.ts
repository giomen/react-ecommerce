import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '../../../shared/models/cart.model';

export interface CartState {
  items: Cart[];
  logged: boolean;
}

const initialState = {
  items: [],
  logged: false,
} as CartState;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLogInfo: (state: CartState, actions: PayloadAction<boolean>) => {
      state.logged = actions.payload;
    },
    addItemToCart: (state: CartState, actions: PayloadAction<Cart>) => {
      state.items = [...state.items, actions.payload];
    },
    removeItemToCart: (state: CartState, actions: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== actions.payload);
    },
  },
});

export const { setLogInfo, addItemToCart, removeItemToCart } =
  cartSlice.actions;

export default cartSlice.reducer;
