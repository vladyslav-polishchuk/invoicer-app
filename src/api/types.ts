export interface CompanyDetails {
  name: string;
  address: string;
  vatNumber: string;
  regNumber: string;
  iban: string;
  swift: string;
}

export interface Client {
  companyDetails: CompanyDetails;
  email: string;
  id: string;
  invoicesCount: number;
  name: string;
  totalBilled: number;
}

export interface Invoice {
  client_id: string;
  date: string;
  dueDate: string;
  id: string;
  invoice_number: string;
  value: number;
  projectCode: string;
  meta?: {
    items: Array<{ value: number; description: string }>;
  };
}

export interface UserResponse {
  name: string;
  email: string;
  token: string;
  companyDetails: CompanyDetails;
}

export interface ClientsResponse {
  clients: Array<Client>;
  total: number;
}

export interface InvoicesResponse {
  invoices: Array<{
    client: Client;
    invoice: Invoice;
  }>;
  total: number;
}

export interface ClientNamesResponce {
  success: boolean;
  clients: Array<{ id: string; companyName: string }>;
}
