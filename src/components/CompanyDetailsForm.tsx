import { Stack } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import FormField from './common/FormField';
import { companyDetailsValidationSchema } from '../utils/formValidationSchema';
import SubmitButton from './auth/SubmitButton';

interface CompanyDetails {
  companyName: string;
  companyAddress: string;
  iban: string;
  vat: string;
  registrationNumber: string;
  swift: string;
}

interface CompanyDetailsFormProps {
  onSubmit: (values: CompanyDetails) => void;
  initialValues: CompanyDetails;
}

const companyDetailsFields = [
  {
    fieldName: 'company-name',
    label: 'Company Name',
    propName: 'companyName',
  },
  {
    fieldName: 'company-address',
    label: 'Company Address',
    propName: 'companyAddress',
  },
  {
    fieldName: 'company-vat',
    label: 'VAT number',
    propName: 'vat',
  },
  {
    fieldName: 'company-reg',
    inputName: 'company-reg-number',
    label: 'Registration number',
    propName: 'registrationNumber',
  },
  {
    fieldName: 'company-iban',
    label: 'IBAN',
    propName: 'iban',
  },
  {
    fieldName: 'company-swift',
    label: 'Swift',
    propName: 'swift',
  },
];

export default function CompanyDetailsForm({
  onSubmit,
  initialValues,
}: CompanyDetailsFormProps) {
  const formik = useFormik({
    initialValues,
    validationSchema: companyDetailsValidationSchema,
    onSubmit,
  });
  const { handleSubmit, getFieldProps, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {companyDetailsFields.map((companyInfo) => (
            <FormField
              key={companyInfo.fieldName}
              fieldName={companyInfo.fieldName}
              label={companyInfo.label}
              {...getFieldProps(companyInfo.propName)}
              inputProps={{
                'data-test': companyInfo.inputName
                  ? companyInfo.inputName
                  : companyInfo.fieldName,
              }}
              formik={formik}
            />
          ))}

          <SubmitButton
            data-test="submit-company-details"
            isSubmitting={isSubmitting}
          >
            Get started
          </SubmitButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
