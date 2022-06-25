import { useRouter } from 'next/router';
import TablePageContainer from './TablePageContainer';
import DropdownMenu from '../common/DropdownMenu';
import { MenuItem } from '@mui/material';
import type {
  GridValueGetterParams,
  GridRowId,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import { InvoiceAppState } from '../../redux';
import { useSelector } from 'react-redux';

interface InvoicesTableProps extends Record<string, unknown> {
  title: string;
}

export default function InvoicesTableContainer(props: InvoicesTableProps) {
  const router = useRouter();
  const editInvoice = (id: GridRowId) => router.push(`/invoices/${id}/edit`);
  const viewInvoice = (id: GridRowId) => router.push(`/invoices/${id}/view`);
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
        <DropdownMenu>
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

  const { invoices, error, loading } = useSelector(
    (state: InvoiceAppState) => state
  );

  return (
    <TablePageContainer
      {...props}
      rows={invoices?.invoices ?? []}
      rowCount={invoices?.total ?? 0}
      error={error}
      loading={loading}
      onViewAllClick={() => router.push('/invoices')}
      onCreateClick={() => router.push('/invoices/new')}
      tableName="invoices"
      entityName="invoice"
      columns={columns}
      getRowId={({ invoice }: Record<string, unknown>) =>
        (invoice as Record<string, string>).id
      }
      onRowClick={({ id }: GridRowParams) => viewInvoice(id)}
    />
  );
}
