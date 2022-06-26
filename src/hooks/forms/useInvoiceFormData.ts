import { array, object, number, string } from 'yup';
import { useFormik } from 'formik';
import type { FormDataProps, FormProps } from './common';
import type { Invoice } from '../../api/types';
import useRouterQuery from '../useRouterQuery';

type UseInvoiceFormDataProps = FormDataProps & {
  data?: Invoice | null;
  clientNames: Array<{
    value: string;
    label: string;
  }>;
};

const submitTestAttribute = 'submit-invoice';
const requiredErrorText = 'This field is required';
const validationSchema = object({
  date: number().required(requiredErrorText),
  dueDate: number().required(requiredErrorText),
  invoice_number: string().required(requiredErrorText),
  projectCode: string().min(3),
  client_id: object().required(requiredErrorText).nullable(),
  meta: object({
    items: array(
      object({
        value: number()
          .positive('This fild must be a valid positive number')
          .typeError('This field must be a number')
          .required(requiredErrorText),
        description: string().required(requiredErrorText),
      }).required()
    ),
  }),
});

export default function useInvoiceFormData(
  props: UseInvoiceFormDataProps
): FormProps {
  const { client_id } = useRouterQuery();
  const { data: invoice, clientNames, onSubmit } = props;
  const clientId = client_id ?? invoice?.client_id;
  const clientMenuOption = clientNames?.find(({ value }) => clientId === value);
  const initialValues = {
    id: invoice?.id,
    date: invoice?.date ?? '',
    dueDate: invoice?.dueDate ?? '',
    invoice_number: invoice?.invoice_number ?? '',
    projectCode: invoice?.projectCode ?? '',
    client_id: clientMenuOption ?? null,
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
      type: 'date',
    },
    {
      fieldName: 'invoice-due-date',
      label: 'Invoice Due Date',
      propName: 'dueDate',
      type: 'date',
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
