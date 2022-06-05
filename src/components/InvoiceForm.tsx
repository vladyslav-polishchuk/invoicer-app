import { useFormik } from 'formik';
import { object, string } from 'yup';
import AutocompleteField from './common/AutocompleteField';
import Form from './common/Form';
import FormField from './common/FormField';

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
];
const requiredErrorText = 'This field is required';
const validationSchema = object({
  date: string().required(requiredErrorText),
  dueDate: string().required(requiredErrorText),
  invoice_number: string().required(requiredErrorText),
  projectCode: string().min(3),
  client_id: object().required(requiredErrorText),
});

export default function InvoiceForm({ invoice, clientNames, onSubmit }) {
  const formik = useFormik({
    initialValues: {
      id: invoice?.id,
      date: invoice?.date ?? '',
      dueDate: invoice?.dueDate ?? '',
      invoice_number: invoice?.invoice_number ?? '',
      projectCode: invoice?.projectCode ?? '',
      client_id:
        clientNames?.find((option) => invoice?.client_id === option.value) ??
        null,
    },
    validationSchema,
    onSubmit: (props) => {
      console.log(props);
      onSubmit({
        ...props,
        client_id: props.client_id.value,
        value: 100,
      });
    },
  });

  return (
    <Form
      formik={formik}
      submitText={'Hi there'}
      submitTestAttribute={'test attribyre'}
    >
      {fields.map(({ fieldName, label, propName }) => (
        <FormField
          key={fieldName}
          fieldName={fieldName}
          label={label}
          {...formik.getFieldProps(propName)}
        />
      ))}

      <AutocompleteField
        options={clientNames}
        fieldName={'invoice_company_id'}
        label={'Invoice Client'}
        {...formik.getFieldProps('client_id')}
      />
    </Form>
  );
}
