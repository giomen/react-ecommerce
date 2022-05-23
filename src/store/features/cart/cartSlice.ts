import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { LogInfo } from '../../../shared/models/cart.model';
import { ProductModel } from '../../../shared/models/products.model';

export interface CartState {
  items: ProductModel[];
  toggleLogin: boolean;
  total: number;
  logged: boolean;
  maxSelectableItems: number;
}

const initialState = {
  items: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')!) : [],
  toggleLogin: false,
  logged: Cookies.get('logged') ? JSON.parse(Cookies.get('logged')!) : false,
  total: 0,
  maxSelectableItems: 10,
} as CartState;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setToggleLogin: (state: CartState, actions: PayloadAction<boolean>) => {
      state.toggleLogin = actions.payload;
    },
    setLogInfo: (state: CartState, actions: PayloadAction<LogInfo>) => {
      actions.payload.logged
        ? actions.payload.remember &&
          Cookies.set('logged', JSON.stringify(true), { expires: 30 })
        : Cookies.remove('logged');

      state.logged = actions.payload.logged;
    },
    addItemToCart: (state: CartState, actions: PayloadAction<ProductModel>) => {
      const newItem = actions.payload;
      const existItem = state.items.find((item) => item.id === newItem.id);

      const cartItems = existItem
        ? state.items.map((item: ProductModel) =>
            item.title === existItem.title ? newItem : item
          )
        : [...state.items, newItem];
      state.items = cartItems;
      const cookieItems = cartItems;
      Cookies.set('cartItems', JSON.stringify(cookieItems), { expires: 1 });
    },
    removeItemFromCart: (state: CartState, actions: PayloadAction<number>) => {
      const cartItems = state.items.filter(
        (item) => item.id !== actions.payload
      );
      Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 1 });
      state.items = cartItems;
    },
    clearCart: (state: CartState) => {
      Cookies.remove('cartItems');
      state.items = [];
    },
    updateQuantity: (
      state: CartState,
      actions: PayloadAction<{ id: number; quantity: number }>
    ) => {
      state.items.forEach((item) => item);
    },
  },
});

export const {
  setLogInfo,
  addItemToCart,
  removeItemFromCart,
  clearCart,
  setToggleLogin,
} = cartSlice.actions;

export default cartSlice.reducer;
