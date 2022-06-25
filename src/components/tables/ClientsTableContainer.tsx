import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { useMobXStore } from '../../mobx';
import TablePageContainer from './TablePageContainer';
import useGridQueryParamsHandlers from '../../hooks/useGridQueryParamsHandlers';
import useClientsTableSchema from '../../hooks/useClientsTableSchema';
import type { GridRowId, GridRowParams } from '@mui/x-data-grid';

interface ClientsTableProps extends Record<string, unknown> {
  title: string;
}

export default observer(function ClientsTableContainer(
  props: ClientsTableProps
) {
  const router = useRouter();
  const paramHandlers = useGridQueryParamsHandlers();
  const tableSchema = useClientsTableSchema();
  const store = useMobXStore();
  const { clients, total, error, loading } = store.getState();
  const editClient = (id: GridRowId) => router.push(`/clients/${id}`);

  return (
    <TablePageContainer
      {...props}
      {...paramHandlers}
      {...tableSchema}
      rows={clients as any as Record<string, unknown>[]}
      rowCount={total}
      error={error}
      loading={loading}
      onViewAllClick={() => router.push('/clients')}
      onCreateClick={() => router.push('/clients/new')}
      tableName="clients"
      entityName="client"
      onRowClick={({ id }: GridRowParams) => editClient(id)}
    />
  );
});
