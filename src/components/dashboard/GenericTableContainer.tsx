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

interface DashboardTableProps {
  title: string;
  sx?: Record<string, string>;
  fetchMethod: (
    params: TableFilterParams
  ) => Promise<InvoicesResponse | ClientsResponse>;
  onViewAllClick: () => void;
  onCreateClick: () => void;
  tableName: 'clients' | 'invoices';
  entityName: string;
  columns: GridColumns;
  getRowId?: (row: Record<string, unknown>) => string;
  onRowClick: (param: GridRowParams) => void;
  onSortModelChange?: (model: GridSortModel) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onPageChange?: (page: number) => void;
}

export default function GenericTableContainer(props: DashboardTableProps) {
  const {
    title,
    columns,
    tableName,
    entityName,
    getRowId,
    onCreateClick,
    onViewAllClick,
    fetchMethod,
    onRowClick,
    onSortModelChange,
    onPageSizeChange,
    onPageChange,
  } = props;
  const { execute, value, error } = useAsync<
    InvoicesResponse | ClientsResponse,
    TableFilterParams
  >(fetchMethod);
  const { isMobile } = useScreenSize();
  const { sortBy, sortOrder, pageSize, page } = useRouterQuery();
  const sort =
    sortBy && sortOrder ? { [sortBy]: sortOrder } : { creation: 'desc' };
  const sortModel =
    sortBy && sortOrder ? [{ field: sortBy, sort: sortOrder }] : [];
  const limit = parseInt(pageSize ?? '10') || 10;
  const currentPage = parseInt(page ?? '0') || 0;
  const offset = currentPage * limit;

  useEffect(() => {
    execute({ limit, offset, sort });
  }, [sortBy, sortOrder, pageSize, page]);

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

  // @ts-expect-error
  const data = value?.[tableName];
  const rowCount = value?.total ?? 0;
  const content = data?.length ? (
    <DashboardTable
      sx={props.sx}
      data={data}
      columns={columns}
      tableName={tableName}
      entityName={entityName}
      getRowId={getRowId}
      onRowClick={onRowClick}
      sortModel={sortModel as GridSortModel}
      onSortModelChange={onSortModelChange}
      pageSize={limit}
      onPageSizeChange={onPageSizeChange}
      page={currentPage}
      onPageChange={onPageChange}
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

          <Button
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
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
