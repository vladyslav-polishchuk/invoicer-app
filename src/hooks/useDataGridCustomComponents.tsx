import {
  GridCell,
  GridOverlay,
  GridNoRowsOverlay,
  GridRow,
  type GridCellProps,
  type GridRowProps,
} from '@mui/x-data-grid';
import { Alert, LinearProgress } from '@mui/material';
import Pagination from '../components/tables/CustomPagination';

export default function useDataGridCustomComponents(
  entityName: string,
  tableName: string
) {
  const Row = (props: GridRowProps) => (
    <GridRow data-test={`${entityName}-row-${props.rowId}`} {...props} />
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
  const NoRowsOverlay = (props: GridCellProps) => (
    <GridNoRowsOverlay data-test="empty-placeholder" {...props} />
  );
  const LoadingOverlay = () => <LinearProgress data-test="loading-overlay" />;
  const ErrorOverlay = (error: string) => {
    return (
      <GridOverlay>
        <Alert
          data-test={`${tableName}-fetch-error`}
          severity="error"
          variant="outlined"
        >
          {Object.values(error).join('')}
        </Alert>
      </GridOverlay>
    );
  };

  return {
    components: {
      Row,
      Cell,
      Pagination,
      LoadingOverlay,
      NoRowsOverlay,
      ErrorOverlay,
    },
  };
}
