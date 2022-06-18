import { Pagination, PaginationItem } from '@mui/material';
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

export default function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          data-test={item.type === 'page' ? `page-${item.page}` : item.type}
        />
      )}
    />
  );
}
