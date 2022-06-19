import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices, InvoiceAppState } from '../../redux';
import Spinner from '../common/Spinner';
import useRouterQuery from '../../hooks/useRouterQuery';

export default function InvoicesTableFetchContainer(props: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();
  const { invoices, error, clientNames } = useSelector(
    (state: InvoiceAppState) => state
  );
  const {
    sortBy = 'creation',
    sortOrder = 'desc',
    pageSize = '10',
    page = '0',
    companyFilter,
  } = useRouterQuery();
  const sort = { [sortBy]: sortOrder };
  const limit = parseInt(pageSize);
  const currentPage = parseInt(page);
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

  if (!error && !invoices) {
    return <Spinner />;
  }

  return <>{props.children}</>;
}
