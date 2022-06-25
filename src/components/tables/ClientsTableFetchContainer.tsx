import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchClients } from '../../redux';
import useRouterQuery from '../../hooks/useRouterQuery';

export default function ClientsTableFetchContainer(props: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();
  const {
    sortBy = 'creation',
    sortOrder = 'desc',
    pageSize = '10',
    page = '1',
  } = useRouterQuery();
  const sort = { [sortBy]: sortOrder };
  const limit = parseInt(pageSize);
  const currentPage = parseInt(page) - 1;
  const offset = currentPage * limit;

  useEffect(() => {
    // @ts-expect-error
    dispatch(fetchClients({ limit, offset, sort }));
  }, [sortBy, sortOrder, limit, offset]);

  return <>{props.children}</>;
}
