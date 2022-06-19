import { createAction, createReducer, configureStore } from '@reduxjs/toolkit';
import type {
  ClientName,
  ClientsResponse,
  InvoicesResponse,
  UserResponse,
} from '../api/types';

export interface InvoiceAppState {
  user: null | UserResponse;
  invoices: null | InvoicesResponse;
  clients: null | ClientsResponse;
  clientNames: null | Array<ClientName>;
}

const initialState = {
  user: null,
  invoices: null,
  clients: null,
  clientNames: null,
} as InvoiceAppState;

export const setUser = createAction<null | UserResponse>('setUser');
export const setInvoices = createAction<null | InvoicesResponse>('setInvoices');
export const setClients = createAction<null | ClientsResponse>('setClients');
export const setClientNames = createAction<null | Array<ClientName>>(
  'setClientNames'
);

const invoiceReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    state.user = action.payload;
  });
  builder.addCase(setInvoices, (state, action) => {
    state.invoices = action.payload;
  });
  builder.addCase(setClients, (state, action) => {
    state.clients = action.payload;
  });
  builder.addCase(setClientNames, (state, action) => {
    state.clientNames = action.payload;
  });
});

export const store = configureStore({
  reducer: invoiceReducer,
});
