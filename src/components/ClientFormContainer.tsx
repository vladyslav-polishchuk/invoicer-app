import { useEffect, useState } from 'react';
import api from '../api';
import FormPage from './common/FormPage';
import useAsync from '../hooks/useAsync';
import ClientForm from './ClientForm';
import { useRouter } from 'next/router';

export default function ClientFormContainer(props: { clientId?: string }) {
  const { clientId } = props;

  const router = useRouter();
  const [success, setSuccess] = useState<string | null>(null);
  const formAction = clientId ? api.updateClient : api.createClient;
  const {
    execute: onSubmit,
    error: submitError,
    value: submittedClient,
  } = useAsync(formAction);
  const {
    execute: getClient,
    error: getClientError,
    value: clientResponse,
  } = useAsync(api.getClient);

  useEffect(() => {
    if (!clientId) return;

    getClient(clientId);
  }, []);

  useEffect(() => {
    if (!submittedClient) return;

    if (formAction === api.updateClient) {
      setSuccess('Client successfuly updated');
    } else {
      setSuccess('Client successfuly created');
    }
  }, [submittedClient]);

  if (clientId && !clientResponse) {
    return <span>Loading ...</span>;
  }

  const client = clientResponse?.client ?? null;
  const initialValues = {
    id: client?.id,
    email: client?.email ?? '',
    name: client?.name ?? '',
    companyDetails: {
      name: client?.companyDetails?.name ?? '',
      address: client?.companyDetails?.address ?? '',
      regNumber: client?.companyDetails.regNumber ?? '',
      iban: client?.companyDetails.iban ?? '',
      swift: client?.companyDetails.swift ?? '',
      vatNumber: client?.companyDetails.vatNumber ?? '',
    },
  };

  return (
    <FormPage
      title="Client info"
      error={getClientError ?? submitError}
      success={success}
    >
      <ClientForm onSubmit={onSubmit} initialValues={initialValues} />
    </FormPage>
  );
}
