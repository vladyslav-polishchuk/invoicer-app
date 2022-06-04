import { useEffect, useState } from 'react';
import api from '../api';
import FormPage from './common/FormPage';
import useAsync from '../hooks/useAsync';
import Spinner from './common/Spinner';
import FormContainer from './common/FormContainer';
import useInvoiceFormData from '../hooks/forms/useInvoiceFormData';

export default function InvoiceFormContainer({
  invoiceId,
}: {
  invoiceId?: string;
}) {
  const [success, setSuccess] = useState<string | null>(null);
  const formAction = invoiceId ? api.updateClient : api.createClient;
  const {
    execute: onSubmit,
    error: submitError,
    value: submittedClient,
  } = useAsync(formAction);
  const {
    execute: getInvoice,
    error: getInvoiceError,
    value: invoiceResponse,
  } = useAsync(api.getClient);
  const formData = useInvoiceFormData({ onSubmit, data: invoiceResponse });

  useEffect(() => {
    if (!invoiceId) return;

    getInvoice(invoiceId);
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

  if (invoiceId && !invoiceResponse) {
    return <Spinner />;
  }

  return (
    <FormPage
      title="Invoice info"
      error={getInvoiceError ?? submitError}
      success={success}
    >
      <FormContainer formData={formData} />
    </FormPage>
  );
}
