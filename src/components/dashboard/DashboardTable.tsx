import {
  DataGrid,
  GridCell,
  GridCellProps,
  GridRow,
  GridRowProps,
  type GridColumns,
} from '@mui/x-data-grid';

interface DashboardTableProps {
  data: Record<string, unknown>[];
  tableName: string;
  columns: GridColumns;
  getRowId?: (row: Record<string, unknown>) => string;
}

export default function DashboardTable({
  data,
  tableName,
  columns,
  getRowId,
}: DashboardTableProps) {
  const Row = (props: GridRowProps) => (
    <GridRow data-test={`${tableName}-id-${props.row.id}`} {...props} />
  );
  const Cell = (props: GridCellProps) => (
    <GridCell data-test={`${tableName}-${props.field}`} {...props} />
  );

  return (
    <div
      style={{ height: 70 * data.length, width: '100%' }}
      data-test={`${tableName}-table`}
    >
      <DataGrid
        components={{ Row, Cell }}
        rows={data}
        columns={columns}
        getRowId={getRowId ?? ((row) => row.id)}
        hideFooter
        disableColumnMenu
        density="compact"
      />
    </div>
  );
}
