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
import type { GridColumns, GridRowParams } from '@mui/x-data-grid';

interface FetchParams {
  limit: number;
  sort: Record<string, string>;
}

interface DashboardTableProps {
  title: string;
  fetchMethod: (params: FetchParams) => Promise<unknown>;
  onViewAllClick: () => void;
  onCreateClick: () => void;
  tableName: string;
  entityName: string;
  columns: GridColumns;
  getRowId?: (row: Record<string, unknown>) => string;
  onRowClick: (param: GridRowParams) => void;
}

export default function DashboardTableContainer(props: DashboardTableProps) {
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
  } = props;
  const { execute, value, error } = useAsync(fetchMethod);
  const { isMobile } = useScreenSize();

  useEffect(() => {
    execute({ limit: 10, sort: { creation: 'desc' } });
  }, []);

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
  const data =
    value && typeof value === 'object'
      ? (value as Record<string, unknown[]>)?.[tableName]
      : null;
  const content = data?.length ? (
    <DashboardTable
      data={data as Record<string, unknown>[]}
      columns={columns}
      tableName={tableName}
      entityName={entityName}
      getRowId={getRowId}
      onRowClick={onRowClick}
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
