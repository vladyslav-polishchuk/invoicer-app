import { Grid } from '@mui/material';
import {
  DataGrid,
  GridCell,
  GridCellProps,
  GridRow,
  GridRowProps,
  type GridRowParams,
  type GridColumns,
} from '@mui/x-data-grid';

interface DashboardTableProps {
  sx?: Record<string, string>;
  data: Record<string, unknown>[];
  tableName: string;
  entityName: string;
  columns: GridColumns;
  getRowId?: (row: Record<string, unknown>) => string;
  onRowClick: (param: GridRowParams) => void;
}

export default function DashboardTable(props: DashboardTableProps) {
  const { data, tableName, entityName, columns, getRowId, onRowClick } = props;
  const getGridRowId = getRowId ?? ((row) => row.id as string);
  const Row = (props: GridRowProps) => (
    <GridRow
      data-test={`${entityName}-row-${getGridRowId(props.row)}`}
      {...props}
    />
  );
  const Cell = (props: GridCellProps) => (
    <GridCell data-test={`${entityName}-${props.field}`} {...props} />
  );

  return (
    <Grid
      container
      data-test={`${tableName}-table`}
      sx={{ minHeight: '30vh', ...props.sx }}
    >
      <Grid item data-test={`${tableName}-table`} sx={{ flexGrow: 1 }}>
        <DataGrid
          components={{ Row, Cell }}
          rows={data}
          columns={columns}
          getRowId={getGridRowId}
          hideFooter
          disableColumnMenu
          density="compact"
          onRowClick={onRowClick}
        />
      </Grid>
    </Grid>
  );
}
