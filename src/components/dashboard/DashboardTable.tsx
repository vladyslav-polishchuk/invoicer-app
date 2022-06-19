import { Grid } from '@mui/material';
import Pagination from './CustomPagination';
import {
  DataGrid,
  GridCell,
  GridCellProps,
  GridRow,
  GridRowProps,
  type GridColumns,
  type GridSortModel,
} from '@mui/x-data-grid';

interface DashboardTableProps extends Record<string, unknown> {
  sx?: Record<string, string>;
  rows: Record<string, unknown>[];
  tableName: string;
  entityName: string;
  columns: GridColumns;
  getRowId?: (row: Record<string, unknown>) => string;
  onSortModelChange?: (model: GridSortModel) => void;
  pageSize: number;
  page?: number;
  rowCount: number;
}

export default function DashboardTable(props: DashboardTableProps) {
  const { tableName, entityName, getRowId, rowCount, pageSize } = props;
  const getGridRowId = getRowId ?? ((row) => row.id as string);
  const Row = (props: GridRowProps) => (
    <GridRow
      data-test={`${entityName}-row-${getGridRowId(props.row)}`}
      {...props}
    />
  );
  const Cell = (props: GridCellProps) => {
    const dataTest = `${entityName}-${props.field}`;
    return (
      <GridCell
        data-test={
          dataTest === 'invoice-companyName' ? 'invoice-company' : dataTest
        }
        {...props}
      />
    );
  };
  const hideFooter = !props.onSortModelChange || rowCount <= pageSize;

  return (
    <Grid container sx={{ minHeight: '30vh', ...props.sx }}>
      <Grid item data-test={`${tableName}-table`} sx={{ flexGrow: 1 }}>
        <DataGrid
          {...props}
          disableColumnMenu
          density="compact"
          sortingMode="server"
          paginationMode="server"
          components={{ Row, Cell, Pagination }}
          hideFooter={hideFooter}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </Grid>
    </Grid>
  );
}
