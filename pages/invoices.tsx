import { Container, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { AuthGuard } from '../src/components/auth/AuthGuard';
import Page from '../src/components/common/Page';
import InvoicesTableContainer from '../src/components/tables/InvoicesTableContainer';
import InvoicesTableFetchContainer from '../src/components/tables/InvoicesTableFetchContainer';
import useGridQueryParamsHandlers from '../src/hooks/useGridQueryParamsHandlers';

export default function Invoices() {
  const paramHandlers = useGridQueryParamsHandlers();
  const router = useRouter();

  const onCompanyFilterChange = (event: React.FocusEvent<HTMLInputElement>) => {
    router.query.companyFilter = event.target.value;
    router.replace({ query: router.query });
  };
  const companyFilterField = (
    <TextField
      label="Company filter"
      sx={{ alignSelf: 'center' }}
      size="small"
      defaultValue={router.query.companyFilter ?? ''}
      onBlur={onCompanyFilterChange}
      data-test="company-filter"
    />
  );

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
              {...paramHandlers}
              companyFilterField={companyFilterField}
            />
          </InvoicesTableFetchContainer>
        </Container>
      </Page>
    </AuthGuard>
  );
}
