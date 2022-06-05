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
];
const validationSchema = object({
  date: string().required(),
  dueDate: string().required(),
  invoice_number: string().required(),
  client_id: object().required(),
});

export default function InvoiceForm({ invoice, clientNames }) {
  const formik = useFormik({
    initialValues: {
      date: invoice?.date,
      dueDate: invoice?.dueDate,
      invoice_number: invoice?.invoice_number,
      client_id: clientNames?.find(
        (option) => invoice?.client_id === option.value
      ),
    },
    validationSchema,
    onSubmit: (props) => {
      console.log(props);
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
        label={'Invoice Client 222'}
        {...formik.getFieldProps('client_id')}
      />
    </Form>
  );
}
