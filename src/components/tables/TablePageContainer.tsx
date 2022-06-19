import { Grid, Button, Stack, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useScreenSize from '../../hooks/useScreenSize';
import useRouterQuery from '../../hooks/useRouterQuery';
import useDataGridCustomComponents from '../../hooks/useDataGridCustomComponents';
import type { GridColumns, GridSortModel } from '@mui/x-data-grid';
import type { ReactNode } from 'react';

interface TablePageProps extends Record<string, unknown> {
  sx?: Record<string, string>;
  title: string;
  rows: Record<string, unknown>[];
  rowCount: number;
  error: string | null;
  loading: boolean;
  onViewAllClick: () => void;
  onCreateClick: () => void;
  tableName: 'clients' | 'invoices';
  entityName: string;
  columns: GridColumns;
  companyFilterField?: ReactNode;
}

export default function TablePageContainer(props: TablePageProps) {
  const { tableName, entityName, companyFilterField } = props;
  const { isMobile } = useScreenSize();
  const { sortBy, sortOrder, pageSize, page } = useRouterQuery();
  const customComponents = useDataGridCustomComponents(entityName, tableName);
  const sortModel = sortBy ? [{ field: sortBy, sort: sortOrder }] : [];
  const limit = parseInt(pageSize ?? '10') || 10;
  const currentPage = parseInt(page ?? '0') || 0;
  const hideFooter = !props.onSortModelChange || props.rowCount <= limit;

  return (
    <Paper elevation={5} sx={{ padding: isMobile ? 1 : 1.5 }}>
      <Stack spacing={2}>
        <Grid container>
          <Typography variant={isMobile ? 'h6' : 'h4'} flexGrow="1">
            {props.title}
          </Typography>

          {companyFilterField}

          <Button
            variant="outlined"
            size="small"
            sx={{ mx: 1 }}
            onClick={props.onCreateClick}
            data-test={`add-${entityName}`}
          >
            Create
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={props.onViewAllClick}
            data-test={`view-all-${tableName}`}
          >
            View All
          </Button>
        </Grid>

        <Grid container sx={{ minHeight: '30vh', ...props.sx }}>
          <Grid item data-test={`${tableName}-table`} sx={{ flexGrow: 1 }}>
            <DataGrid
              {...props}
              {...customComponents}
              disableColumnMenu
              density="compact"
              sortingMode="server"
              paginationMode="server"
              rowsPerPageOptions={[10, 25, 50]}
              hideFooter={hideFooter}
              sortModel={sortModel as GridSortModel}
              pageSize={limit}
              page={currentPage}
              loading={props.loading}
              error={props.error}
            />
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
}
