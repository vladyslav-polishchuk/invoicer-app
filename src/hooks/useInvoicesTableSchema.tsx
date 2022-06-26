import { useRouter } from 'next/router';
import { MenuItem } from '@mui/material';
import DropdownMenu from '../components/common/DropdownMenu';
import type {
  GridRenderCellParams,
  GridRowId,
  GridValueGetterParams,
} from '@mui/x-data-grid';

export default function useInvoicesTableSchema() {
  const router = useRouter();
  const sortable = router.pathname !== '/';
  const editInvoice = (id: GridRowId) => router.push(`/invoices/${id}/edit`);
  const printInvoice = (id: GridRowId) =>
    router.push({
      pathname: `/invoices/${id}/view`,
      query: { print: true },
    });

  const columns = [
    {
      field: 'number',
      headerName: 'Invoice #',
      minWidth: 100,
      sortable: false,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.invoice.invoice_number,
    },
    {
      field: 'companyName',
      headerName: 'Company',
      minWidth: 100,
      flex: 1,
      sortable,
      valueGetter: ({ row }: GridValueGetterParams) =>
        row.client.companyDetails.name,
      renderHeader: () => (
        <strong data-test="company-name-header">Company</strong>
      ),
    },
    {
      field: 'creationDate',
      headerName: 'Date',
      minWidth: 140,
      sortable,
      valueGetter: ({ row }: GridValueGetterParams) =>
        new Date(row.invoice.date).toDateString(),
      renderHeader: () => (
        <strong data-test="creation-date-header">Date</strong>
      ),
      renderCell: ({ value }: GridRenderCellParams) => (
        <div data-test="invoice-date">{value}</div>
      ),
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      minWidth: 140,
      sortable,
      valueGetter: ({ row }: GridValueGetterParams) =>
        new Date(row.invoice.dueDate).toDateString(),
      renderHeader: () => <strong data-test="due-date-header">Due Date</strong>,
    },
    {
      field: 'projectCode',
      headerName: 'Project',
      minWidth: 70,
      sortable: false,
      valueGetter: ({ row }: GridValueGetterParams) => row.invoice.projectCode,
    },
    {
      field: 'total',
      headerName: 'Total',
      minWidth: 100,
      sortable,
      valueGetter: ({ row }: GridValueGetterParams) => `${row.invoice.value}$`,
      renderHeader: () => <strong data-test="total-header">Total</strong>,
      renderCell: ({ value }: GridRenderCellParams) => (
        <div data-test="invoice-price">{value}</div>
      ),
    },
    {
      field: 'actions',
      sortable: false,
      headerName: '',
      width: 54,
      renderCell: ({ id }: GridRenderCellParams) => (
        <DropdownMenu ariaLabel="Invoice row actions">
          <MenuItem onClick={() => printInvoice(id)} data-test="invoice-print">
            Print
          </MenuItem>
          <MenuItem onClick={() => editInvoice(id)} data-test="invoice-edit">
            Edit
          </MenuItem>
        </DropdownMenu>
      ),
    },
  ];

  return { columns };
}
