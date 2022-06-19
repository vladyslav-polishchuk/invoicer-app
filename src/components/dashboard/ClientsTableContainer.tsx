import api from '../../api';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import TablePageContainer from './TablePageContainer';
import DropdownMenu from '../common/DropdownMenu';
import { MenuItem } from '@mui/material';
import { InvoiceAppState } from '../../store';
import type {
  GridRenderCellParams,
  GridRowId,
  GridRowParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';

interface ClientsTableProps extends Record<string, unknown> {
  title: string;
}

export default function ClientsTableContainer(props: ClientsTableProps) {
  const router = useRouter();
  const editClient = (id: GridRowId) => router.push(`/clients/${id}`);
  const createInvoice = (id: GridRowId) =>
    router.push(`/invoices/new?client_id=${id}`);
  const columns = [
    { field: 'name', headerName: 'Name', minWidth: 100, flex: 1 },
    {
      field: 'companyName',
      headerName: 'Company name',
      minWidth: 100,
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) => row.companyDetails.name,
    },
    { field: 'totalBilled', headerName: 'Total Billed', width: 100 },
    { field: 'invoicesCount', headerName: 'Invoices', width: 100 },
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

  const { clients, error, loading } = useSelector(
    (state: InvoiceAppState) => state
  );

  return (
    <TablePageContainer
      {...props}
      rows={(clients?.clients ?? []) as any as Record<string, unknown>[]}
      rowCount={clients?.total ?? 0}
      error={error}
      loading={loading}
      fetchMethod={api.getClients}
      onViewAllClick={() => router.push('/clients')}
      onCreateClick={() => router.push('/clients/new')}
      tableName="clients"
      entityName="client"
      columns={columns}
      onRowClick={({ id }: GridRowParams) => editClient(id)}
    />
  );
}
