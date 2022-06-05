import { createAction, createReducer, configureStore } from '@reduxjs/toolkit';
import type { UserResponse } from '../api/types';

export interface InvoiceAppState {
  user: null | UserResponse;
}

const initialState = {
  user: null,
} as InvoiceAppState;

export const setUser = createAction<null | UserResponse>('setUser');

const invoiceReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    state.user = action.payload;
  });
});

export const store = configureStore({
  reducer: invoiceReducer,
});
