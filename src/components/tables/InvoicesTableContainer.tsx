import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import TablePageContainer from './TablePageContainer';
import useInvoicesQueryParamsHandlers from '../../hooks/useInvoicesQueryParamsHandlers';
import useInvoicesTableSchema from '../../hooks/useInvoicesTableSchema';
import type { GridRowId, GridRowParams } from '@mui/x-data-grid';
import type { InvoiceAppState } from '../../redux';

interface InvoicesTableProps extends Record<string, unknown> {
  title: string;
}

export default function InvoicesTableContainer(props: InvoicesTableProps) {
  const router = useRouter();
  const paramHandlers = useInvoicesQueryParamsHandlers();
  const tableSchema = useInvoicesTableSchema();
  const { invoices, error, loading } = useSelector(
    (state: InvoiceAppState) => state
  );
  const viewInvoice = (id: GridRowId) => router.push(`/invoices/${id}/view`);

  return (
    <TablePageContainer
      {...props}
      {...paramHandlers}
      {...tableSchema}
      rows={invoices?.invoices ?? []}
      rowCount={invoices?.total ?? 0}
      error={error}
      loading={loading}
      onViewAllClick={() => router.push('/invoices')}
      onCreateClick={() => router.push('/invoices/new')}
      tableName="invoices"
      entityName="invoice"
      getRowId={({ invoice }: Record<string, Record<string, string>>) =>
        invoice.id
      }
      onRowClick={({ id }: GridRowParams) => viewInvoice(id)}
    />
  );
}
