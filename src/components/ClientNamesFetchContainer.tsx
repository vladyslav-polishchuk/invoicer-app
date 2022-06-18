import { ReactNode, useEffect } from 'react';
import api from '../api';
import useAsync from '../hooks/useAsync';
import { useDispatch, useSelector } from 'react-redux';
import { InvoiceAppState, setClientNames } from '../store';
import Spinner from './common/Spinner';
import { useAuthContext } from './auth/AuthContext';

interface ClientNamesFetchContainerProps {
  children: ReactNode;
}

export default function ClientNamesFetchContainer({
  children,
}: ClientNamesFetchContainerProps) {
  const { userToken } = useAuthContext();
  const dispatch = useDispatch();
  const { clientNames } = useSelector((state: InvoiceAppState) => state);
  const { execute, value } = useAsync(api.getClientNames);

  useEffect(() => {
    userToken && execute(undefined);
  }, [userToken]);

  useEffect(() => {
    if (value?.clients) {
      dispatch(setClientNames(value.clients));
    }
  }, [value]);

  if (userToken && !clientNames) {
    return <Spinner />;
  }

  return <>{children}</>;
}
