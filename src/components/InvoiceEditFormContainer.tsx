import { useEffect, useState } from 'react';
import api from '../api';
import FormPage from './common/form/FormPage';
import useAsync from '../hooks/useAsync';
import InvoiceItems from './InvoiceItems';
import FormContainer from './common/form/FormContainer';
import useInvoiceFormData from '../hooks/forms/useInvoiceFormData';
import type { ClientName, Invoice } from '../api/types';
import type { Option } from './common/form/fields/AutocompleteField';

interface InvoiceEditFormProps {
  invoice?: Invoice | null;
  clientNames?: Array<ClientName>;
  error?: string | null;
}

export default function InvoiceEditFormContainer(props: InvoiceEditFormProps) {
  const { invoice: data, clientNames: clients } = props;
  const [success, setSuccess] = useState<string | null>(null);
  const formAction = data ? api.updateInvoice : api.createInvoice;
  const { execute, error, value } = useAsync(formAction);
  const clientNames = (clients ?? []).map(({ id, companyName }) => ({
    value: id,
    label: companyName,
  }));
  const onSubmit = (invoice: Invoice) => {
    const items = invoice.meta?.items ?? [];
    const value = items.reduce((acc, item) => acc + parseFloat(item.value), 0);
    const client = invoice.client_id as unknown as Option;
    const client_id = client.value;

    return execute({ ...invoice, client_id, value });
  };
  const formData = useInvoiceFormData({ data, onSubmit, clientNames });

  useEffect(() => {
    if (!value) return;

    if (formAction === api.updateInvoice) {
      setSuccess('Invoice successfuly updated');
    } else {
      setSuccess('Invoice successfuly created');
      formData.formik.resetForm();
    }
  }, [value]);

  return (
    <FormPage
      title="Invoice info"
      error={props.error ?? error}
      success={success}
    >
      <FormContainer formData={formData}>
        <InvoiceItems />
      </FormContainer>
    </FormPage>
  );
}
