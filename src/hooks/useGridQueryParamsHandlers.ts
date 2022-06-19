import { useRouter } from 'next/router';
import type { GridSortModel } from '@mui/x-data-grid';

export default function useGridQueryParamsHandlers() {
  const router = useRouter();
  const onSortModelChange = (sortModel: GridSortModel) => {
    const [column] = sortModel;
    if (column) {
      const { field, sort } = column;
      router.query.sortBy = field;
      router.query.sortOrder = sort as string;
    } else {
      delete router.query.sortBy;
      delete router.query.sortOrder;
    }

    router.replace({ query: router.query });
  };
  const onPageSizeChange = (pageSize: number) => {
    router.query.pageSize = pageSize.toString();
    router.replace({ query: router.query });
  };
  const onPageChange = (page: number) => {
    router.query.page = page.toString();
    router.replace({ query: router.query });
  };

  return { onSortModelChange, onPageSizeChange, onPageChange };
}
