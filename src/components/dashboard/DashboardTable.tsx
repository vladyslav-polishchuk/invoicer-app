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
  entityName: string;
  columns: GridColumns;
  getRowId?: (row: Record<string, unknown>) => string;
}

export default function DashboardTable(props: DashboardTableProps) {
  const { data, tableName, entityName, columns, getRowId, ...rest } = props;
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
    <div
      style={{ height: 70 * data.length, width: '100%' }}
      data-test={`${tableName}-table`}
    >
      <DataGrid
        components={{ Row, Cell }}
        rows={data}
        columns={columns}
        getRowId={getGridRowId}
        hideFooter
        disableColumnMenu
        density="compact"
        {...rest}
      />
    </div>
  );
}
