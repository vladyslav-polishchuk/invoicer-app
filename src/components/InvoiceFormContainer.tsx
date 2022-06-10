import { useEffect, useState } from 'react';
import api from '../api';
import FormPage from './common/form/FormPage';
import useAsync from '../hooks/useAsync';
import Spinner from './common/Spinner';
import InvoiceItemsContainer from './InvoiceItemsContainer';
import FormContainer from './common/form/FormContainer';
import useInvoiceFormData from '../hooks/forms/useInvoiceFormData';

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
  const onSubmit = (props: any) => {
    const items = props.meta.items;
    const value = items.reduce(
      (acc: any, item: any) => (acc += parseFloat(item.value)),
      0
    );

    submitForm({
      ...props,
      client_id: props.client_id.value,
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
        <InvoiceItemsContainer meta={invoiceResponse?.invoice?.meta} />
      </FormContainer>
    </FormPage>
  );
}
