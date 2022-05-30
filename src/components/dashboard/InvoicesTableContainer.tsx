import api from '../../api';
import { useRouter } from 'next/router';
import DashboardTableContainer from './DashboardTableContainer';
import DropdownMenu from '../common/DropdownMenu';
import { MenuItem } from '@mui/material';
import type { GridValueGetterParams, GridRow } from '@mui/x-data-grid';

const columns = [
  {
    field: 'invoice',
    headerName: 'Invoice #',
    minWidth: 100,
    valueGetter: ({ row }: GridValueGetterParams) => row.invoice.invoice_number,
  },
  {
    field: 'client',
    headerName: 'Company',
    minWidth: 100,
    flex: 1,
    valueGetter: ({ row }: GridValueGetterParams) =>
      row.client.companyDetails.name,
  },
  {
    field: 'date',
    headerName: 'Date',
    minWidth: 140,
    valueGetter: ({ row }: GridValueGetterParams) =>
      new Date(row.invoice.date).toDateString(),
  },
  {
    field: 'project',
    headerName: 'Project',
    minWidth: 70,
    valueGetter: ({ row }: GridValueGetterParams) => '',
  },
  {
    field: 'amount',
    headerName: 'Amount',
    minWidth: 100,
    valueGetter: ({ row }: GridValueGetterParams) => `${row.invoice.value}$`,
  },
  {
    field: 'menu',
    sortable: false,
    headerName: '',
    width: 54,
    renderCell: () => (
      <DropdownMenu>
        <MenuItem>Add Invoice</MenuItem>
        <MenuItem>Edit Client</MenuItem>
      </DropdownMenu>
    ),
  },
];

export default function ClientsTableContainer() {
  const router = useRouter();

  return (
    <DashboardTableContainer
      title="Latest Invoices"
      fetchMethod={api.getInvoices}
      onViewAllClick={() => router.push('/invoices')}
      onCreateClick={() => {}}
      tableName="invoices"
      columns={columns}
      getRowId={({ invoice }: Record<string, unknown>) =>
        (invoice as Record<string, string>).id
      }
    />
  );
}
