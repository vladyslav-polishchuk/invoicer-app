import {
  Grid,
  Button,
  Stack,
  Typography,
  Skeleton,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useEffect } from 'react';
import useAsync from '../../hooks/useAsync';
import DashboardTable from './DashboardTable';
import type { GridColumns } from '@mui/x-data-grid';
import { ClientsResponse, InvoicesResponse } from '../../api/api';

interface FetchParams {
  limit: number;
  sort: Record<string, string>;
}

interface DashboardTableProps {
  title: string;
  fetchMethod: (
    params: FetchParams
  ) => Promise<ClientsResponse | InvoicesResponse>;
  onViewAllClick: () => void;
  onCreateClick: () => void;
  tableName: 'clients' | 'invoices';
  columns: GridColumns;
  getRowId?: (row: Record<string, unknown>) => string;
}

export default function DashboardTableContainer(props: DashboardTableProps) {
  const { execute, value } = useAsync<
    ClientsResponse | InvoicesResponse,
    FetchParams
  >(props.fetchMethod);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    execute({ limit: 10, sort: { creation: 'desc' } });
  }, []);

  const loadingPlaceholder = (
    <Skeleton variant="rectangular" data-test="loading-overlay" height={400} />
  );
  const emptyPlaceholder = (
    <Typography align="center" sx={{ padding: 5 }}>
      No Data for display
    </Typography>
  );
  const data = value ? value[props.tableName] : null;
  const content = data?.length ? (
    <DashboardTable
      data={data as Record<string, unknown>[]}
      columns={props.columns}
      tableName={props.tableName}
      getRowId={props.getRowId}
    />
  ) : data ? (
    emptyPlaceholder
  ) : (
    loadingPlaceholder
  );

  return (
    <Paper elevation={5} sx={{ padding: isMobile ? 1 : 2 }}>
      <Stack spacing={2}>
        <Grid container>
          <Typography variant={isMobile ? 'h6' : 'h4'} flexGrow="1">
            {props.title}
          </Typography>

          <Button
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
            onClick={props.onCreateClick}
          >
            Create
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={props.onViewAllClick}
          >
            View All
          </Button>
        </Grid>

        {content}
      </Stack>
    </Paper>
  );
}
