import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CollectionListing,
  CollectionListingResponse,
} from '../../../shared/models/collectionListing.model';
import { StatusType } from '../../../shared/models/status.enum';
import Cookies from 'js-cookie';

export interface CollectionsIdentifier {
  id: number;
  name: string;
}

export interface CollectionsState {
  status: StatusType;
  collections: CollectionListing[];
  activeCollection: CollectionsIdentifier | null;
  collectionsNames: CollectionsIdentifier[];
}

const initialState = {
  status: StatusType.IDLE,
  collections: [],
  activeCollection: Cookies.get('ActiveCollection')
    ? JSON.parse(Cookies.get('ActiveCollection')!)
    : null,
  collectionsNames: [],
} as CollectionsState;

export const getCollections = createAsyncThunk(
  'collections/getCollections',
  async (url: string) => {
    const response = await fetch(url);
    return (await response.json()) as CollectionListingResponse;
  }
);

export const collectionSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setActiveCollection: (
      state: CollectionsState,
      actions: PayloadAction<number>
    ) => {
      const elem = state.collections.find(
        (item) => item.collection_id === actions.payload
      );
      Cookies.set(
        'ActiveCollection',
        JSON.stringify({
          id: elem!.collection_id,
          name: elem!.title,
        })
      );
      state.activeCollection = {
        id: elem!.collection_id,
        name: elem!.title,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCollections.fulfilled,
      (
        state: CollectionsState,
        actions: PayloadAction<CollectionListingResponse>
      ) => {
        state.collections = actions.payload.collection_listings;
        const elements = actions.payload.collection_listings.map((item) => {
          return { id: item.collection_id, name: item.title };
        });
        state.collectionsNames = elements;
        state.status = StatusType.SUCCEDED;
      }
    );
  },
});

export const { setActiveCollection } = collectionSlice.actions;

export default collectionSlice.reducer;
