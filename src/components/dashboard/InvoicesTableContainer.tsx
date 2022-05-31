import api from '../../api';
import { useRouter } from 'next/router';
import DashboardTableContainer from './DashboardTableContainer';
import DropdownMenu from '../common/DropdownMenu';
import { MenuItem } from '@mui/material';
import type { GridValueGetterParams, GridRow } from '@mui/x-data-grid';

const columns = [
  {
    field: 'number',
    headerName: 'Invoice #',
    minWidth: 100,
    valueGetter: ({ row }: GridValueGetterParams) => row.invoice.invoice_number,
  },
  {
    field: 'company',
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
    field: 'price',
    headerName: 'Amount',
    minWidth: 100,
    valueGetter: ({ row }: GridValueGetterParams) => `${row.invoice.value}$`,
  },
  {
    field: 'actions',
    sortable: false,
    headerName: '',
    width: 54,
    renderCell: () => (
      <DropdownMenu>
        <MenuItem>Print</MenuItem>
        <MenuItem>Edit</MenuItem>
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
      entityName="invoice"
      columns={columns}
      getRowId={({ invoice }: Record<string, unknown>) =>
        (invoice as Record<string, string>).id
      }
      onRowDoubleClick={({ id }) => {
        router.push(`/invoice/${id}/view`);
      }}
    />
  );
}
