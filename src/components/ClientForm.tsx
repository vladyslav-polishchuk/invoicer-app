import { useFormik } from 'formik';
import FormField from './common/FormField';
import { clientFormValidationSchema } from '../utils/formValidationSchema';
import Form from './common/Form';
import type { Client } from '../api/api';

interface ClientFormProps {
  onSubmit: (
    values: Partial<Client>,
    formikData: { resetForm: () => void }
  ) => void;
  initialValues: Partial<Client>;
}

const companyDetailsFields = [
  {
    fieldName: 'client-email',
    label: 'Email',
    propName: 'email',
  },
  {
    fieldName: 'client-name',
    label: 'Name',
    propName: 'name',
  },
  {
    fieldName: 'client-company-name',
    label: 'Company Name',
    propName: 'companyDetails.name',
  },
  {
    fieldName: 'client-company-address',
    label: 'Company Address',
    propName: 'companyDetails.address',
  },
  {
    fieldName: 'client-company-reg',
    label: 'Registry number',
    propName: 'companyDetails.regNumber',
  },
  {
    fieldName: 'client-company-iban',
    label: 'IBAN',
    propName: 'companyDetails.iban',
  },
  {
    fieldName: 'client-company-swift',
    label: 'Swift',
    propName: 'companyDetails.swift',
  },
  {
    fieldName: 'client-company-vat',
    label: 'VAT number',
    propName: 'companyDetails.vatNumber',
  },
];

export default function ClientForm({
  onSubmit,
  initialValues,
}: ClientFormProps) {
  const formik = useFormik({
    initialValues,
    validationSchema: clientFormValidationSchema,
    onSubmit,
  });
  const { getFieldProps } = formik;

  return (
    <Form formik={formik} submitTestAttribute="submit-client">
      {companyDetailsFields.map((companyInfo) => (
        <FormField
          key={companyInfo.fieldName}
          fieldName={companyInfo.fieldName}
          label={companyInfo.label}
          {...getFieldProps(companyInfo.propName)}
          formik={formik}
        />
      ))}
    </Form>
  );
}
