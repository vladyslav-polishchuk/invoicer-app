import { Container } from '@mui/material';
import { AuthGuard } from '../src/components/auth/AuthGuard';
import Page from '../src/components/common/Page';
import InvoicesTableContainer from '../src/components/dashboard/InvoicesTableContainer';

export default function Invoices() {
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
            />
          </Container>
        </Page>
      </AuthGuard>
    </AuthGuard>
  );
}
