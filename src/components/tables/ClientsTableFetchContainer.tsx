import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, InvoiceAppState } from '../../redux';
import Spinner from '../common/Spinner';
import useRouterQuery from '../../hooks/useRouterQuery';

export default function ClientsTableFetchContainer(props: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();
  const { clients, error, clientNames } = useSelector(
    (state: InvoiceAppState) => state
  );
  const {
    sortBy = 'creation',
    sortOrder = 'desc',
    pageSize = '10',
    page = '1',
    companyFilter,
  } = useRouterQuery();
  const sort = { [sortBy]: sortOrder };
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
    dispatch(fetchClients({ limit, offset, sort, filter }));
  }, [sortBy, sortOrder, limit, offset, companyFilter]);

  if (!error && !clients) {
    return <Spinner />;
  }

  return <>{props.children}</>;
}
