import { createAction, createReducer, configureStore } from '@reduxjs/toolkit';
import type { ClientName, UserResponse } from '../api/types';

export interface InvoiceAppState {
  user: null | UserResponse;
  clientNames: null | Array<ClientName>;
}

const initialState = {
  user: null,
  clientNames: null,
} as InvoiceAppState;

export const setUser = createAction<null | UserResponse>('setUser');
export const setClientNames = createAction<null | Array<ClientName>>(
  'setClientNames'
);

const invoiceReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    state.user = action.payload;
  });
  builder.addCase(setClientNames, (state, action) => {
    state.clientNames = action.payload;
  });
});

export const store = configureStore({
  reducer: invoiceReducer,
});
