import api from '../../api';
import { useRouter } from 'next/router';
import { MenuItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useMobXStore } from '../../mobx';
import TablePageContainer from './TablePageContainer';
import DropdownMenu from '../common/DropdownMenu';
import type {
  GridRenderCellParams,
  GridRowId,
  GridRowParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';

interface ClientsTableProps extends Record<string, unknown> {
  title: string;
}

export default observer(function ClientsTableContainer(
  props: ClientsTableProps
) {
  const router = useRouter();
  const editClient = (id: GridRowId) => router.push(`/clients/${id}`);
  const createInvoice = (id: GridRowId) =>
    router.push(`/invoices/new?client_id=${id}`);
  const columns = [
    {
      field: 'clientName',
      headerName: 'Name',
      minWidth: 100,
      flex: 1,
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
      valueGetter: ({ row }: GridValueGetterParams) => row.companyDetails.name,
      renderHeader: () => (
        <strong data-test="company-name-header">Company name</strong>
      ),
    },
    {
      field: 'totalBilled',
      headerName: 'Total Billed',
      width: 100,
      renderHeader: () => (
        <strong data-test="total-billed-header">Total Billed</strong>
      ),
    },
    {
      field: 'invoicesCount',
      headerName: 'Invoices',
      width: 100,
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

  const store = useMobXStore();
  const { clients, total, error, loading } = store.getState();

  return (
    <TablePageContainer
      {...props}
      rows={clients as any as Record<string, unknown>[]}
      rowCount={total}
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
});
