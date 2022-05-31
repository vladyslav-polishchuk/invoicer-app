import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import api from '../api';
import FormPage from './common/FormPage';
import useAsync from '../hooks/useAsync';
import { InvoiceAppState, setUser } from '../store';
import CompanyDetailsForm from './CompanyDetailsForm';

export default function CompanyDetailsFormContainer() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: InvoiceAppState) => state);
  const router = useRouter();
  const [success, setSuccess] = useState<string | null>(null);
  const { execute, error, value } = useAsync(api.updateCompanyDetails);
  useEffect(() => {
    if (!value) return;

    dispatch(setUser(value.user));

    if (!Object.keys(user?.companyDetails ?? {}).length) {
      router.push('/');
    } else {
      setSuccess('Company details updated successfuly');
    }
  }, [value, user, dispatch, router]);

  if (!user) {
    return null;
  }

  const companyDetails = user.companyDetails ?? {};
  const initialValues = {
    name: companyDetails.name ?? '',
    address: companyDetails.address ?? '',
    iban: companyDetails.iban ?? '',
    vatNumber: companyDetails.vatNumber ?? '',
    regNumber: companyDetails.regNumber ?? '',
    swift: companyDetails.swift ?? '',
  };
  const infoMessage = !Object.keys(companyDetails).length
    ? 'You need to setup company info before you can proceed'
    : '';

  return (
    <FormPage
      title="Company Details"
      error={error}
      success={success}
      info={infoMessage}
    >
      <CompanyDetailsForm onSubmit={execute} initialValues={initialValues} />
    </FormPage>
  );
}
