import { Stack } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import api from '../api';
import AuthPage from './auth/AuthPage';
import FormField from './common/FormField';
import useAsync from '../hooks/useAsync';
import { companyDetailsValidationSchema } from '../utils/formValidationSchema';
import { InvoiceAppState, setUser } from '../store';
import SubmitButton from './auth/SubmitButton';

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

export default function CompanyDetailsContainer() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: InvoiceAppState) => state);
  const router = useRouter();
  const [success, setSuccess] = useState<string | null>(null);
  const { execute, error, value } = useAsync(api.updateCompanyDetails);

  useEffect(() => {
    if (!value) return;

    dispatch(setUser(value.user));

    if (!user?.companyDetails) {
      router.push('/');
    } else {
      setSuccess('Company details updated successfuly');
    }
  }, [value]);

  const companyDetails = user?.companyDetails;
  const formik = useFormik({
    initialValues: {
      companyName: companyDetails?.companyName ?? '',
      companyAddress: companyDetails?.companyAddress ?? '',
      iban: companyDetails?.iban ?? '',
      vat: companyDetails?.vat ?? '',
      registrationNumber: companyDetails?.registrationNumber ?? '',
      swift: companyDetails?.swift ?? '',
    },
    validationSchema: companyDetailsValidationSchema,
    onSubmit: execute,
  });
  const { handleSubmit, getFieldProps, isSubmitting } = formik;
  const infoMessage =
    companyDetails === null
      ? 'You need to setup company info before you can proceed'
      : '';

  return (
    <AuthPage
      title="Invoicer | Company Details"
      error={error}
      success={success}
      info={infoMessage}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {companyDetailsFields.map((companyInfo) => {
              return (
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
              );
            })}

            <SubmitButton
              data-test="submit-company-details"
              isSubmitting={isSubmitting}
            >
              Get started
            </SubmitButton>
          </Stack>
        </Form>
      </FormikProvider>
    </AuthPage>
  );
}
