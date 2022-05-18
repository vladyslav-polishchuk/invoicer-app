import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { InvoiceAppState } from '../../store';

export const NonAuthGuard = (props: { children: ReactNode }) => {
  const { token } = useSelector((state: InvoiceAppState) => state);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push('/');
    }
  }, [token]);

  if (token) {
    return null;
  }

  return <>{props.children}</>;
};
