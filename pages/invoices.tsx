import { Container } from '@mui/material';
import { AuthGuard } from '../src/components/auth/AuthGuard';
import Page from '../src/components/common/Page';
import InvoicesTableContainer from '../src/components/tables/InvoicesTableContainer';
import InvoicesTableFetchContainer from '../src/components/tables/InvoicesTableFetchContainer';

export default function Invoices() {
  return (
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
          <InvoicesTableFetchContainer>
            <InvoicesTableContainer
              title="All Invoices"
              sx={{ minHeight: '70vh' }}
            />
          </InvoicesTableFetchContainer>
        </Container>
      </Page>
    </AuthGuard>
  );
}
