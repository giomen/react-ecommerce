import { configureStore } from '@reduxjs/toolkit';
import collectionsReducer from './features/collections/collectionsSlice';
import productsReducer from './features/products/productsSlice';
import productReducer from './features/product/productSlice';
import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    collections: collectionsReducer,
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
