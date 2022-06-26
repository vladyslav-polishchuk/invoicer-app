import { MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import DropdownMenu from '../components/common/DropdownMenu';
import type {
  GridRenderCellParams,
  GridRowId,
  GridValueGetterParams,
} from '@mui/x-data-grid';

export default function useClientsTableSchema() {
  const router = useRouter();
  const sortable = router.pathname !== '/';
  const editClient = (id: GridRowId) => router.push(`/clients/${id}`);
  const createInvoice = (id: GridRowId) =>
    router.push(`/invoices/new?client_id=${id}`);
  const columns = [
    {
      field: 'clientName',
      headerName: 'Name',
      minWidth: 100,
      flex: 1,
      sortable,
      valueGetter: ({ row }: GridValueGetterParams) => row.name,
      renderHeader: () => <strong data-test="client-name-header">Name</strong>,
      renderCell: (cell: GridRenderCellParams) => (
        <div data-test="client-name">{cell.value}</div>
      ),
    },
    {
      field: 'companyName',
      headerName: 'Company name',
      minWidth: 100,
      flex: 1,
      sortable,
      valueGetter: ({ row }: GridValueGetterParams) => row.companyDetails.name,
      renderHeader: () => (
        <strong data-test="company-name-header">Company name</strong>
      ),
    },
    {
      field: 'totalBilled',
      headerName: 'Total Billed',
      width: 100,
      sortable,
      renderHeader: () => (
        <strong data-test="total-billed-header">Total Billed</strong>
      ),
    },
    {
      field: 'invoicesCount',
      headerName: 'Invoices',
      width: 100,
      sortable,
      renderHeader: () => (
        <strong data-test="invoices-count-header">Invoices</strong>
      ),
    },
    {
      field: 'actions',
      sortable: false,
      headerName: '',
      width: 54,
      renderCell: ({ id }: GridRenderCellParams) => (
        <DropdownMenu>
          <MenuItem onClick={() => createInvoice(id)}>Add Invoice</MenuItem>
          <MenuItem onClick={() => editClient(id)}>Edit Client</MenuItem>
        </DropdownMenu>
      ),
    },
  ];

  return { columns };
}
