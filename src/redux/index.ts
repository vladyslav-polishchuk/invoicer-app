import {
  createAction,
  createReducer,
  configureStore,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import api from '../api';
import type {
  ClientName,
  InvoicesResponse,
  TableFilterParams,
  UserResponse,
} from '../api/types';

export interface InvoiceAppState {
  user: null | UserResponse;
  invoices: null | InvoicesResponse;
  error: null | string;
  loading: boolean;
  clientNames: null | Array<ClientName>;
}

const initialState = {
  user: null,
  invoices: null,
  error: '',
  loading: false,
  clientNames: null,
} as InvoiceAppState;

export const setUser = createAction<null | UserResponse>('setUser');
export const setClientNames = createAction<null | Array<ClientName>>(
  'setClientNames'
);

export const fetchInvoices = createAsyncThunk(
  'fetchInvoices',
  async (params: TableFilterParams) => {
    return await api.getInvoices(params);
  }
);

const invoiceReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setClientNames, (state, action) => {
      state.clientNames = action.payload;
    });

  builder
    .addCase(fetchInvoices.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchInvoices.fulfilled, (state, action) => {
      state.invoices = action.payload;
      state.error = null;
      state.loading = false;
    })
    .addCase(fetchInvoices.rejected, (state, action) => {
      state.invoices = null;
      state.error = action.error.message ?? null;
      state.loading = false;
    });
});

export const store = configureStore({
  reducer: invoiceReducer,
});
