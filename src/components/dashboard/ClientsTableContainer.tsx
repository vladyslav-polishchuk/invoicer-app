import api from '../../api';
import { useRouter } from 'next/router';
import DashboardTableContainer from './DashboardTableContainer';
import DropdownMenu from '../common/DropdownMenu';
import { MenuItem } from '@mui/material';
import type {
  GridRenderCellParams,
  GridRowId,
  GridValueGetterParams,
} from '@mui/x-data-grid';

export default function ClientsTableContainer() {
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

  return (
    <DashboardTableContainer
      title="Latest Clients"
      fetchMethod={api.getClients}
      onViewAllClick={() => router.push('/clients')}
      onCreateClick={() => router.push('/clients/new')}
      tableName="clients"
      entityName="client"
      columns={columns}
      onRowClick={({ id }) => editClient(id)}
    />
  );
}
