import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api';
import useAsync from '../../hooks/useAsync';
import { InvoiceAppState, setClients } from '../../store';
import Spinner from '../common/Spinner';
import useRouterQuery from '../../hooks/useRouterQuery';

export default function ClientsTableFetchContainer(props: {
  children: ReactNode;
}) {
  const { execute, value, error } = useAsync(api.getClients);
  const dispatch = useDispatch();
  const { clients, clientNames } = useSelector(
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
    execute({ limit, offset, sort, filter });
  }, [sortBy, sortOrder, limit, offset, companyFilter]);

  useEffect(() => {
    value && dispatch(setClients(value));
  }, [value]);

  if (!error && !clients) {
    return <Spinner />;
  }

  return <>{props.children}</>;
}