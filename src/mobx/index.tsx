import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import type { Client, ClientsResponse } from '../api/types';
import type { ReactNode } from 'react';

class ObservableStore {
  clients: Array<Client> = [];
  total: number = 0;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setClients(clients: ClientsResponse) {
    this.clients = clients.clients;
    this.total = clients.total;
    this.loading = false;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string) {
    this.error = error;
    this.loading = false;
  }

  getState() {
    return {
      clients: [...this.clients],
      total: this.total,
      loading: this.loading,
      error: this.error,
    };
  }
}

export const mobxStore = new ObservableStore();

export const StoreContext = createContext<ObservableStore>(mobxStore);

export const MobXStoreProvider = ({
  store,
  children,
}: {
  children: ReactNode;
  store: ObservableStore;
}) => <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;

export const useMobXStore = () => {
  return useContext(StoreContext);
};
