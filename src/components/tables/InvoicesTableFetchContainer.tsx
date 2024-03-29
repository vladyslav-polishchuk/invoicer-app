import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices, InvoiceAppState } from '../../redux';
import { useRouter } from 'next/router';
import useRouterQuery from '../../hooks/useRouterQuery';

const urlSortParamToServerMap = new Map([
  ['total', 'price'],
  ['creationDate', 'date'],
]);

export default function InvoicesTableFetchContainer(props: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();
  const { clientNames } = useSelector((state: InvoiceAppState) => state);
  const router = useRouter();
  const {
    sortBy = router.pathname === '/' ? 'creation' : '',
    sortOrder = 'desc',
    pageSize = '10',
    page = '1',
    companyFilter,
  } = useRouterQuery();
  const mappedSortBy = urlSortParamToServerMap.get(sortBy) ?? sortBy;
  const sort = mappedSortBy ? { [mappedSortBy]: sortOrder } : undefined;
  const limit = parseInt(pageSize);
  const currentPage = parseInt(page) - 1;
  const offset = currentPage * limit;
  const filter = companyFilter
    ? {
        clientId:
          clientNames?.find((client) =>
            client.companyName
              .toLowerCase()
              .startsWith(companyFilter.toLowerCase())
          )?.id ?? 'unknown',
      }
    : {};

  useEffect(() => {
    // @ts-expect-error
    dispatch(fetchInvoices({ limit, offset, sort, filter }));
  }, [sortBy, sortOrder, limit, offset, companyFilter]);

  return <>{props.children}</>;
}
