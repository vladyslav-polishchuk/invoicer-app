import { ReactNode, useEffect } from 'react';
import { useMobXStore } from '../../mobx';
import useRouterQuery from '../../hooks/useRouterQuery';
import api from '../../api';

export default function ClientsTableFetchContainer(props: {
  children: ReactNode;
}) {
  const store = useMobXStore();
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
    store.setLoading(true);

    api
      .getClients({ limit, offset, sort })
      .then((res) => store.setClients(res))
      .catch(({ message }: Error) => store.setError(message));
  }, [sortBy, sortOrder, limit, offset]);

  return <>{props.children}</>;
}
