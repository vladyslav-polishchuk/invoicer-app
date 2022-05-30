import api from '../../api';
import { useRouter } from 'next/router';
import DashboardTableContainer from './DashboardTableContainer';
import DropdownMenu from '../common/DropdownMenu';
import { MenuItem } from '@mui/material';
import type { GridValueGetterParams } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Name', minWidth: 100, flex: 1 },
  {
    field: 'companyDetails',
    headerName: 'Company name',
    minWidth: 100,
    flex: 1,
    valueGetter: ({ row }: GridValueGetterParams) => row.companyDetails.name,
  },
  { field: 'totalBilled', headerName: 'Total Billed', width: 100 },
  { field: 'invoicesCount', headerName: 'Invoices', width: 100 },
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
      title="Latest Clients"
      fetchMethod={api.getClients}
      onViewAllClick={() => router.push('/clients')}
      onCreateClick={() => {}}
      tableName="clients"
      columns={columns}
    />
  );
}
