import {
  Grid,
  Button,
  Stack,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAsync from '../../hooks/useAsync';
import DashboardTable from './DashboardTable';
import useScreenSize from '../../hooks/useScreenSize';
import useRouterQuery from '../../hooks/useRouterQuery';
import type {
  GridColumns,
  GridRowParams,
  GridSortModel,
} from '@mui/x-data-grid';
import type {
  ClientsResponse,
  InvoicesResponse,
  TableFilterParams,
} from '../../api/types';
import type { InvoiceAppState } from '../../store';

interface DashboardTableProps extends Record<string, unknown> {
  title: string;
  fetchMethod: (
    params: TableFilterParams
  ) => Promise<InvoicesResponse | ClientsResponse>;
  onViewAllClick: () => void;
  onCreateClick: () => void;
  tableName: 'clients' | 'invoices';
  entityName: string;
  columns: GridColumns;
  onRowClick: (param: GridRowParams) => void;
  companyFilterField?: any;
}

export default function GenericTableContainer(props: DashboardTableProps) {
  const {
    title,
    tableName,
    entityName,
    onCreateClick,
    onViewAllClick,
    fetchMethod,
    onRowClick,
    companyFilterField,
  } = props;
  const { execute, value, error } = useAsync<
    InvoicesResponse | ClientsResponse,
    TableFilterParams
  >(fetchMethod);
  const { clientNames } = useSelector((state: InvoiceAppState) => state);
  const { isMobile } = useScreenSize();
  const { sortBy, sortOrder, pageSize, page, companyFilter } = useRouterQuery();
  const sort =
    sortBy && sortOrder ? { [sortBy]: sortOrder } : { creation: 'desc' };
  const sortModel =
    sortBy && sortOrder ? [{ field: sortBy, sort: sortOrder }] : [];
  const limit = parseInt(pageSize ?? '10') || 10;
  const currentPage = parseInt(page ?? '0') || 0;
  const offset = currentPage * limit;
  const filter = companyFilter
    ? {
        clientId:
          clientNames?.find((client) =>
            client.companyName
              .toLowerCase()
              .startsWith(companyFilter.toLowerCase())
          )?.id ?? 'unknown',
      }
    : {};

  useEffect(() => {
    execute({ limit, offset, sort, filter });
  }, [sortBy, sortOrder, pageSize, page, companyFilter]);

  const loadingPlaceholder = (
    <CircularProgress
      size={60}
      sx={{ alignSelf: 'center' }}
      data-test="loading-overlay"
    />
  );
  const emptyPlaceholder = (
    <Typography
      align="center"
      sx={{ padding: 5 }}
      data-test="empty-placeholder"
    >
      No Data for display
    </Typography>
  );

  if (!clientNames) return null;

  // @ts-expect-error
  const data = value?.[tableName];
  const rowCount = value?.total ?? 0;
  const content = data?.length ? (
    <DashboardTable
      {...props}
      rows={data}
      tableName={tableName}
      entityName={entityName}
      onRowClick={onRowClick}
      sortModel={sortModel as GridSortModel}
      pageSize={limit}
      page={currentPage}
      rowCount={rowCount}
    />
  ) : data ? (
    emptyPlaceholder
  ) : (
    loadingPlaceholder
  );

  return (
    <Paper elevation={5} sx={{ padding: isMobile ? 1 : 1.5 }}>
      <Stack spacing={2}>
        <Grid container>
          <Typography variant={isMobile ? 'h6' : 'h4'} flexGrow="1">
            {title}
          </Typography>

          {companyFilterField}

          <Button
            variant="outlined"
            size="small"
            sx={{ mx: 1 }}
            onClick={onCreateClick}
            data-test={`add-${entityName}`}
          >
            Create
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={onViewAllClick}
            data-test={`view-all-${tableName}`}
          >
            View All
          </Button>
        </Grid>

        {error ? (
          <Alert
            data-test={`${tableName}-fetch-error`}
            severity="error"
            variant="filled"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        ) : (
          content
        )}
      </Stack>
    </Paper>
  );
}
