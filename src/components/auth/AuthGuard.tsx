import { useRouter } from 'next/router';
import { useEffect, type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import type { InvoiceAppState } from '../../store';

export const AuthGuard = (props: { children: ReactNode }) => {
  const { token, user } = useSelector((state: InvoiceAppState) => state);
  const router = useRouter();

  useEffect(() => {
    if (user && user.companyDetails === null) {
      router.push('/company-details');
    }
  }, [user]);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  const isLoggedOut = !token;
  const isCompanyDetailsMissed =
    user && user.companyDetails === null && router.route !== '/company-details';
  if (isLoggedOut || isCompanyDetailsMissed) {
    return null;
  }

  return <>{props.children}</>;
};
