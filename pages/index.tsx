import Page from '../src/components/common/Page';
import { AuthGuard } from '../src/components/auth/AuthGuard';
import { Container, Grid } from '@mui/material';
import ClientsTableContainer from '../src/components/dashboard/ClientsTableContainer';
import InvoicesTableContainer from '../src/components/dashboard/InvoicesTableContainer';

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
              <ClientsTableContainer />
            </Grid>
            <Grid item xs={12} lg={6}>
              <InvoicesTableContainer />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </AuthGuard>
  );
}
