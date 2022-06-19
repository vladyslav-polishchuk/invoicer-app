import { useRouter } from 'next/router';
import { useEffect, type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import type { InvoiceAppState } from '../../redux';

export const AuthGuard = (props: { children: ReactNode }) => {
  const { user } = useSelector((state: InvoiceAppState) => state);
  const router = useRouter();

  useEffect(() => {
    if (user && !Object.keys(user.companyDetails ?? {}).length) {
      router.push('/company-details');
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  const isCompanyDetailsMissed =
    user?.companyDetails === null && router.route !== '/company-details';
  if (!user || isCompanyDetailsMissed) {
    return null;
  }

  return <>{props.children}</>;
};
