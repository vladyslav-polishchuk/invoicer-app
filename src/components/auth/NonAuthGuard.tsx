import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { InvoiceAppState } from '../../store';

export const NonAuthGuard = (props: { children: ReactNode }) => {
  const { user } = useSelector((state: InvoiceAppState) => state);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  if (user) {
    return null;
  }

  return <>{props.children}</>;
};
