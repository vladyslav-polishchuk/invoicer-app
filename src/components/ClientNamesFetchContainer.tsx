import { ReactNode, useEffect } from 'react';
import api from '../api';
import useAsync from '../hooks/useAsync';
import { useDispatch } from 'react-redux';
import { setClientNames } from '../store';
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
  const { execute, value } = useAsync(api.getClientNames);

  useEffect(() => {
    userToken && execute(undefined);
  }, [userToken]);

  useEffect(() => {
    if (value?.clients) {
      dispatch(setClientNames(value.clients));
    }
  }, [value]);

  if (userToken && !value) {
    return <Spinner />;
  }

  return <>{children}</>;
}
