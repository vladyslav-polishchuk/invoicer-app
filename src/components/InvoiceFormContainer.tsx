import { useEffect, useState } from 'react';
import api from '../api';
import FormPage from './common/FormPage';
import useAsync from '../hooks/useAsync';
import Spinner from './common/Spinner';
import InvoiceForm from './InvoiceForm';
import { object, string } from 'yup';

export default function InvoiceFormContainer({
  invoiceId,
}: {
  invoiceId?: string;
}) {
  const [success, setSuccess] = useState<string | null>(null);
  const formAction = invoiceId ? api.updateInvoice : api.createInvoice;
  const {
    execute: onSubmit,
    error: submitError,
    value: submittedInvoice,
  } = useAsync(formAction);
  const {
    execute: getInvoice,
    error: getInvoiceError,
    value: invoiceResponse,
  } = useAsync(api.getIncoice);
  const {
    execute: getClientNames,
    error: getClientNamesError,
    value: clientNamesResponse,
  } = useAsync(api.getClientNames);

  useEffect(() => {
    getClientNames(undefined);

    if (invoiceId) {
      getInvoice(invoiceId);
    }
  }, []);

  useEffect(() => {
    if (!submittedInvoice) return;

    if (formAction === api.updateClient) {
      setSuccess('Invoice successfuly updated');
    } else {
      setSuccess('Invoice successfuly created');
      //formData.formik.resetForm();
    }
  }, [submittedInvoice]);

  if (!clientNamesResponse || (invoiceId && !invoiceResponse)) {
    return <Spinner />;
  }

  const clientNames = clientNamesResponse?.clients?.map(
    ({ id, companyName }) => ({
      value: id,
      label: companyName,
    })
  );

  return (
    <FormPage
      title="Invoice info"
      error={getInvoiceError ?? submitError ?? getClientNamesError}
      success={success}
    >
      <InvoiceForm
        invoice={invoiceResponse?.invoice}
        clientNames={clientNames}
        onSubmit={onSubmit}
      />
    </FormPage>
  );
}
