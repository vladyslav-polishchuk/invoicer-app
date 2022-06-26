import { Container } from '@mui/material';
import { AuthGuard } from '../src/components/auth/AuthGuard';
import ClientNamesFetchContainer from '../src/components/ClientNamesFetchContainer';
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
          <ClientNamesFetchContainer>
            <InvoicesTableFetchContainer>
              <InvoicesTableContainer
                title="All Invoices"
                sx={{ minHeight: '70vh' }}
              />
            </InvoicesTableFetchContainer>
          </ClientNamesFetchContainer>
        </Container>
      </Page>
    </AuthGuard>
  );
}
