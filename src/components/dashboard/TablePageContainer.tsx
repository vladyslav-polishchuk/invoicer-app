import {
  Grid,
  Button,
  Stack,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import DataTable from './DataTable';
import useScreenSize from '../../hooks/useScreenSize';
import useRouterQuery from '../../hooks/useRouterQuery';
import type { GridColumns } from '@mui/x-data-grid';

interface TablePageProps extends Record<string, unknown> {
  title: string;
  rows: Record<string, unknown>[];
  rowCount: number;
  onViewAllClick: () => void;
  onCreateClick: () => void;
  tableName: 'clients' | 'invoices';
  entityName: string;
  columns: GridColumns;
  companyFilterField?: any;
}

const loadingPlaceholder = (
  <CircularProgress
    size={60}
    sx={{ alignSelf: 'center' }}
    data-test="loading-overlay"
  />
);
const emptyPlaceholder = (
  <Typography align="center" sx={{ padding: 5 }} data-test="empty-placeholder">
    No Data for display
  </Typography>
);

export default function TablePageContainer(props: TablePageProps) {
  const {
    title,
    tableName,
    entityName,
    onCreateClick,
    onViewAllClick,
    companyFilterField,
    rows,
  } = props;
  let error = null;
  const { isMobile } = useScreenSize();
  const { sortBy, sortOrder, pageSize, page } = useRouterQuery();
  const sortModel =
    sortBy && sortOrder ? [{ field: sortBy, sort: sortOrder }] : [];
  const limit = parseInt(pageSize ?? '10') || 10;
  const currentPage = parseInt(page ?? '0') || 0;

  let content = null;
  if (error) {
    content = (
      <Alert
        data-test={`${tableName}-fetch-error`}
        severity="error"
        variant="filled"
        sx={{ mb: 3 }}
      >
        {error}
      </Alert>
    );
  } else if (rows?.length) {
    content = (
      <DataTable
        {...props}
        sortModel={sortModel}
        pageSize={limit}
        page={currentPage}
      />
    );
  } else if (rows) {
    content = emptyPlaceholder;
  }

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

        {content ?? loadingPlaceholder}
      </Stack>
    </Paper>
  );
}
