import { Container } from '@mui/material';
import { AuthGuard } from '../src/components/auth/AuthGuard';
import Page from '../src/components/common/Page';
import ClientsTableContainer from '../src/components/tables/ClientsTableContainer';
import ClientsTableFetchContainer from '../src/components/tables/ClientsTableFetchContainer';

export default function Clients() {
  return (
    <AuthGuard>
      <Page title="Clients">
        <Container
          sx={{
            display: 'flex',
            minHeight: '85vh',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <ClientsTableFetchContainer>
            <ClientsTableContainer
              title="All Clients"
              sx={{ minHeight: '70vh' }}
            />
          </ClientsTableFetchContainer>
        </Container>
      </Page>
    </AuthGuard>
  );
}
