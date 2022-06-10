import { useEffect, useState } from 'react';
import api from '../api';
import FormPage from './common/form/FormPage';
import useAsync from '../hooks/useAsync';
import Spinner from './common/Spinner';
import InvoiceItemsContainer from './InvoiceItemsContainer';
import FormContainer from './common/form/FormContainer';
import useInvoiceFormData from '../hooks/forms/useInvoiceFormData';
import type { Invoice } from '../api/types';
import type { Option } from './common/form/fields/AutocompleteField';

export default function InvoiceFormContainer({
  invoiceId,
}: {
  invoiceId?: string;
}) {
  const [success, setSuccess] = useState<string | null>(null);
  const formAction = invoiceId ? api.updateInvoice : api.createInvoice;
  const {
    execute: submitForm,
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
  const clientNames =
    clientNamesResponse?.clients?.map(({ id, companyName }) => ({
      value: id,
      label: companyName,
    })) ?? [];
  const onSubmit = (invoice: Invoice) => {
    const items = invoice.meta?.items ?? [];
    const value = items.reduce((acc, item) => acc + parseFloat(item.value), 0);
    const client = invoice.client_id as unknown as Option;

    return submitForm({
      ...invoice,
      client_id: client.value,
      value,
    });
  };
  const formData = useInvoiceFormData({
    data: invoiceResponse,
    onSubmit,
    clientNames,
  });

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
      formData.formik.resetForm();
    }
  }, [submittedInvoice]);

  if (!clientNamesResponse || (invoiceId && !invoiceResponse)) {
    return <Spinner />;
  }

  return (
    <FormPage
      title="Invoice info"
      error={getInvoiceError ?? submitError ?? getClientNamesError}
      success={success}
    >
      <FormContainer formData={formData}>
        <InvoiceItemsContainer invoice={invoiceResponse?.invoice} />
      </FormContainer>
    </FormPage>
  );
}
