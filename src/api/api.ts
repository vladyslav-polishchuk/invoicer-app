import type {
  Client,
  ClientNamesResponce,
  ClientsResponse,
  CompanyDetails,
  Invoice,
  InvoicesResponse,
  UserResponse,
} from './types';

interface RequestParams {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: string;
  headers?: Record<string, string>;
}

export default class API {
  declare serverUrl;
  declare token: string | null;
  declare logout: () => void;

  constructor(serverUrl: string | undefined) {
    if (!serverUrl) {
      throw new Error('Valid string with server URL should be privied');
    }

    this.serverUrl = serverUrl;
  }

  initApi = (token: string, logout: () => void) => {
    this.token = token;
    this.logout = logout;
  };

  sendRequest = async <T>(url: string, params?: RequestParams): Promise<T> => {
    const { method = 'GET', body, headers } = params ?? {};
    const token = this.token ? { 'x-access-token': this.token } : null;
    const response = await fetch(`${this.serverUrl}/${url}`, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
        ...token,
        ...headers,
      },
    });
    if (response.ok) {
      return await response.json();
    }

    const responseText = await response.text();
    if (response.status === 401 && responseText === 'Invalid Token') {
      this.logout();
    }

    throw new Error(responseText);
  };

  login = async (params: { email: string; password: string }) => {
    return await this.sendRequest<UserResponse>('login', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  };

  signup = async (params: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    return await this.sendRequest<{ user_id: string }>('register', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  };

  getCompanyDetails = async () => {
    return await this.sendRequest<UserResponse>('me');
  };

  updateCompanyDetails = async (
    params: CompanyDetails
  ): Promise<{ success: boolean; user: UserResponse }> => {
    return await this.sendRequest('me/company', {
      method: 'PUT',
      body: JSON.stringify(params),
    });
  };

  getClients = async (params: {
    limit: number;
    sort: Record<string, string>;
  }) => {
    const queryParams = JSON.stringify(params);

    return await this.sendRequest<ClientsResponse>(
      `clients?params=${queryParams}`
    );
  };

  getInvoices = async (params: {
    limit: number;
    sort: Record<string, string>;
  }) => {
    const queryParams = JSON.stringify(params);

    return await this.sendRequest<InvoicesResponse>(
      `invoices?params=${queryParams}`
    );
  };

  getClient = async (clientId: string) => {
    return await this.sendRequest<{ success: boolean; client: Client }>(
      `clients/${clientId}`
    );
  };

  createClient = async (params: Partial<Client>) => {
    return await this.sendRequest('clients', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  };

  updateClient = async (params: Partial<Client>) => {
    return await this.sendRequest('clients', {
      method: 'PUT',
      body: JSON.stringify(params),
    });
  };

  getClientNames = async () => {
    return await this.sendRequest<ClientNamesResponce>(`clients/names`);
  };

  getIncoice = async (invoiceId: string) => {
    return await this.sendRequest<{ success: boolean; invoice: Invoice }>(
      `invoices/${invoiceId}`
    );
  };

  createInvoice = async (params: Partial<Invoice>) => {
    return await this.sendRequest('invoices', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  };

  updateInvoice = async (params: Partial<Invoice>) => {
    return await this.sendRequest('invoices', {
      method: 'PUT',
      body: JSON.stringify(params),
    });
  };
}
