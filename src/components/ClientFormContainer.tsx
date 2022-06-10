import { useEffect, useState } from 'react';
import api from '../api';
import FormPage from './common/form/FormPage';
import useAsync from '../hooks/useAsync';
import useClientFormData from '../hooks/forms/useClientFormData';
import Spinner from './common/Spinner';
import FormContainer from './common/form/FormContainer';

interface ClientFormContainerProps {
  clientId?: string;
}

export default function ClientFormContainer({
  clientId,
}: ClientFormContainerProps) {
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
  const formData = useClientFormData({ data: clientResponse, onSubmit });

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
      formData.formik.resetForm();
    }
  }, [submittedClient]);

  if (clientId && !clientResponse) {
    return <Spinner />;
  }

  return (
    <FormPage
      title="Client info"
      error={getClientError ?? submitError}
      success={success}
      successTestAttribute="form-success"
    >
      <FormContainer formData={formData} />
    </FormPage>
  );
}
