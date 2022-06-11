import { object, string } from 'yup';
import { useFormik } from 'formik';
import type { FormDataProps, FormProps } from './common';
import type { InvoiceResponse } from '../../api/types';

type UseInvoiceFormDataProps = FormDataProps & {
  data?: InvoiceResponse | null;
  clientNames: Array<{
    value: string;
    label: string;
  }>;
};

const submitTestAttribute = 'submit-invoice';
const requiredErrorText = 'This field is required';
const validationSchema = object({
  date: string().required(requiredErrorText),
  dueDate: string().required(requiredErrorText),
  invoice_number: string().required(requiredErrorText),
  projectCode: string().min(3),
  client_id: object().required(requiredErrorText),
});

export default function useInvoiceFormData(
  props: UseInvoiceFormDataProps
): FormProps {
  const { data, clientNames, onSubmit } = props;
  const invoice = data?.invoice;
  const clientId = clientNames?.find(
    ({ value }) => invoice?.client_id === value
  );
  const initialValues = {
    id: invoice?.id,
    date: invoice?.date ?? '',
    dueDate: invoice?.dueDate ?? '',
    invoice_number: invoice?.invoice_number ?? '',
    projectCode: invoice?.projectCode ?? '',
    client_id: clientId ?? null,
    meta: { items: invoice?.meta?.items ?? [] },
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const fields = [
    {
      fieldName: 'invoice-date',
      label: 'Invoice Date',
      propName: 'date',
    },
    {
      fieldName: 'invoice-due-date',
      label: 'Invoice Due Date',
      propName: 'dueDate',
    },
    {
      fieldName: 'invoice-number',
      label: 'Invoice Number',
      propName: 'invoice_number',
    },
    {
      fieldName: 'invoice-project-code',
      label: 'Project Code',
      propName: 'projectCode',
    },
    {
      fieldName: 'invoice-company-id',
      label: 'Invoice Client',
      propName: 'client_id',
      type: 'autocomplete',
      props: {
        options: clientNames,
      },
    },
  ];

  return { fields, submitTestAttribute, formik };
}
