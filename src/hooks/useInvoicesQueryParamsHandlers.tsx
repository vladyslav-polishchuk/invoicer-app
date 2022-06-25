import { Autocomplete, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useGridQueryParamsHandlers from './useGridQueryParamsHandlers';
import useScreenSize from './useScreenSize';
import useRouterQuery from './useRouterQuery';
import type { SyntheticEvent } from 'react';
import type { InvoiceAppState } from '../redux';

export default function useInvoicesQueryParamsHandlers() {
  const baseHandlers = useGridQueryParamsHandlers();
  const router = useRouter();
  const { isMobile } = useScreenSize();
  const { clientNames } = useSelector((state: InvoiceAppState) => state);
  const { companyFilter } = useRouterQuery();

  if (router.pathname !== '/invoices') {
    return baseHandlers;
  }

  const onCompanyFilterChange = (
    event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value) {
      router.query.page = '1';
      router.query.companyFilter = value;
    } else {
      delete router.query.companyFilter;
    }

    router.replace({ query: router.query });
  };
  const companyFilterField = (
    <Autocomplete
      fullWidth={isMobile}
      sx={{
        alignSelf: 'center',
        minWidth: '200px',
        mt: isMobile ? 1 : 0,
        order: isMobile ? 1 : 0,
      }}
      size="small"
      data-test="company-filter"
      value={companyFilter}
      onChange={onCompanyFilterChange}
      options={(clientNames ?? []).map((client) => client.companyName)}
      renderInput={(params) => <TextField {...params} label="Company Filter" />}
    />
  );

  return { ...baseHandlers, companyFilterField };
}
