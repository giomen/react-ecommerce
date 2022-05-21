import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductModel } from '../../../shared/models/products.model';
import Cookies from 'js-cookie';

export interface CartState {
  items: ProductModel[];
  total: number;
  logged: boolean;
  maxSelectableItems: number;
}

const initialState = {
  items: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')!) : [],
  logged: false,
  total: 0,
  maxSelectableItems: 10,
} as CartState;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLogInfo: (state: CartState, actions: PayloadAction<boolean>) => {
      state.logged = actions.payload;
    },
    addItemToCart: (state: CartState, actions: PayloadAction<ProductModel>) => {
      const newItem = actions.payload;
      const existItem = state.items.find((item) => item.id === newItem.id);

      const cartItems = existItem
        ? state.items.map((item: ProductModel) =>
            item.title === existItem.title ? newItem : item
          )
        : [...state.items, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 1 });
      state.items = cartItems;
    },
    removeItemFromCart: (state: CartState, actions: PayloadAction<number>) => {
      const cartItems = state.items.filter(
        (item) => item.id !== actions.payload
      );
      Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 1 });
      state.items = cartItems;
    },
    updateQuantity: (
      state: CartState,
      actions: PayloadAction<{ id: number; quantity: number }>
    ) => {
      state.items.forEach((item) => item);
    },
  },
});

export const { setLogInfo, addItemToCart, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
