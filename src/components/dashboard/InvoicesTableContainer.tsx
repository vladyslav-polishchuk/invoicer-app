import api from '../../api';
import { useRouter } from 'next/router';
import DashboardTableContainer from './DashboardTableContainer';
import DropdownMenu from '../common/DropdownMenu';
import { MenuItem } from '@mui/material';
import type {
  GridValueGetterParams,
  GridRowId,
  GridRenderCellParams,
} from '@mui/x-data-grid';

export default function ClientsTableContainer() {
  const router = useRouter();
  const editInvoice = (id: GridRowId) => router.push(`/invoices/${id}/view`);
  const columns = [
    {
      field: 'number',
      headerName: 'Invoice #',
      minWidth: 100,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.invoice.invoice_number,
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
      field: 'projectCode',
      headerName: 'Project',
      minWidth: 70,
      valueGetter: ({ row }: GridValueGetterParams) => row.invoice.projectCode,
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
      renderCell: ({ id }: GridRenderCellParams) => (
        <DropdownMenu>
          <MenuItem>Print</MenuItem>
          <MenuItem onClick={() => editInvoice(id)}>Edit</MenuItem>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DashboardTableContainer
      title="Latest Invoices"
      fetchMethod={api.getInvoices}
      onViewAllClick={() => router.push('/invoices')}
      onCreateClick={() => router.push('/invoices/new')}
      tableName="invoices"
      entityName="invoice"
      columns={columns}
      getRowId={({ invoice }: Record<string, unknown>) =>
        (invoice as Record<string, string>).id
      }
      onRowDoubleClick={({ id }) => editInvoice(id)}
    />
  );
}
