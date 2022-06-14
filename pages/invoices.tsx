import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { AuthGuard } from '../src/components/auth/AuthGuard';
import Page from '../src/components/common/Page';
import InvoicesTableContainer from '../src/components/dashboard/InvoicesTableContainer';
import type { GridSortModel } from '@mui/x-data-grid';

export default function Invoices() {
  const router = useRouter();
  const onSortModelChange = (sortModel: GridSortModel) => {
    const [column] = sortModel;
    if (column) {
      const { field, sort } = column;
      router.query.sortBy = field;
      router.query.sortOrder = sort as string;
    } else {
      delete router.query.sortBy;
      delete router.query.sortOrder;
    }

    router.replace({ query: router.query });
  };
  const onPageSizeChange = (pageSize: number) => {
    router.query.pageSize = pageSize.toString();
    router.replace({ query: router.query });
  };
  const onPageChange = (page: number) => {
    router.query.page = page.toString();
    router.replace({ query: router.query });
  };

  return (
    <AuthGuard>
      <AuthGuard>
        <Page title="Invoices">
          <Container
            sx={{
              display: 'flex',
              minHeight: '85vh',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <InvoicesTableContainer
              title="All Invoices"
              sx={{ minHeight: '70vh' }}
              onSortModelChange={onSortModelChange}
              onPageSizeChange={onPageSizeChange}
              onPageChange={onPageChange}
            />
          </Container>
        </Page>
      </AuthGuard>
    </AuthGuard>
  );
}
