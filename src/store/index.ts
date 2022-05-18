import { createAction, createReducer, configureStore } from '@reduxjs/toolkit';
import type { UserResponse } from '../api/api';

export interface InvoiceAppState {
  token: null | string;
  user: null | UserResponse;
}

const initialState = {
  user: null,
  token: null,
} as InvoiceAppState;

export const setUser = createAction<null | UserResponse>('setUser');
export const setToken = createAction<null | string>('setToken');

const invoiceReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    state.user = action.payload;
  });
  builder.addCase(setToken, (state, action) => {
    state.token = action.payload;
  });
});

export const store = configureStore({
  reducer: invoiceReducer,
});
