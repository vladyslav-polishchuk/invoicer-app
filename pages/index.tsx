import Page from '../src/components/common/Page';
import { AuthGuard } from '../src/components/auth/AuthGuard';
import { Container, Grid } from '@mui/material';
import ClientsTableContainer from '../src/components/tables/ClientsTableContainer';
import ClientsTableFetchContainer from '../src/components/tables/ClientsTableFetchContainer';
import InvoicesTableContainer from '../src/components/tables/InvoicesTableContainer';
import InvoicesTableFetchContainer from '../src/components/tables/InvoicesTableFetchContainer';

export default function Home() {
  return (
    <AuthGuard>
      <Page title="Invoicer | Dashboard">
        <Container
          sx={{
            display: 'flex',
            minHeight: '85vh',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <ClientsTableFetchContainer>
                <ClientsTableContainer title="Latest Clients" />
              </ClientsTableFetchContainer>
            </Grid>
            <Grid item xs={12} lg={6}>
              <InvoicesTableFetchContainer>
                <InvoicesTableContainer title="Latest Invoices" />
              </InvoicesTableFetchContainer>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </AuthGuard>
  );
}
