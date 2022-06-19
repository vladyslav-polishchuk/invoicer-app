import { Container } from '@mui/material';
import { AuthGuard } from '../src/components/auth/AuthGuard';
import Page from '../src/components/common/Page';
import ClientsTableContainer from '../src/components/dashboard/ClientsTableContainer';
import ClientsTableFetchContainer from '../src/components/dashboard/ClientsTableFetchContainer';
import useGridQueryParamsHandlers from '../src/hooks/useGridQueryParamsHandlers';

export default function Clients() {
  const paramHandlers = useGridQueryParamsHandlers();

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
              {...paramHandlers}
            />
          </ClientsTableFetchContainer>
        </Container>
      </Page>
    </AuthGuard>
  );
}
