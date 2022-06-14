import api from '../../api';
import { useRouter } from 'next/router';
import GenericTableContainer from './GenericTableContainer';
import DropdownMenu from '../common/DropdownMenu';
import { MenuItem } from '@mui/material';
import type {
  GridSortModel,
  GridValueGetterParams,
  GridRowId,
  GridRenderCellParams,
} from '@mui/x-data-grid';

interface InvoicesTableProps {
  title?: string;
  sx?: Record<string, string>;
  onSortModelChange?: (model: GridSortModel) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onPageChange?: (page: number) => void;
}

export default function InvoicesTableContainer(props: InvoicesTableProps) {
  const { title = 'Latest Invoices' } = props;
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
    },
    {
      field: 'date',
      headerName: 'Date',
      minWidth: 140,
      valueGetter: ({ row }: GridValueGetterParams) =>
        new Date(row.invoice.date).toDateString(),
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      minWidth: 140,
      valueGetter: ({ row }: GridValueGetterParams) =>
        new Date(row.invoice.dueDate).toDateString(),
    },
    {
      field: 'projectCode',
      headerName: 'Project',
      minWidth: 70,
      sortable: false,
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

  return (
    <GenericTableContainer
      title={title}
      sx={props.sx}
      fetchMethod={api.getInvoices}
      onViewAllClick={() => router.push('/invoices')}
      onCreateClick={() => router.push('/invoices/new')}
      tableName="invoices"
      entityName="invoice"
      columns={columns}
      getRowId={({ invoice }: Record<string, unknown>) =>
        (invoice as Record<string, string>).id
      }
      onRowClick={({ id }) => viewInvoice(id)}
      onSortModelChange={props.onSortModelChange}
      onPageSizeChange={props.onPageSizeChange}
      onPageChange={props.onPageChange}
    />
  );
}
