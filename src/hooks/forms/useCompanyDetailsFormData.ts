import { object, string } from 'yup';
import { useFormik } from 'formik';
import type { FormValidationProps } from './common';
import type { UserResponse } from '../../api/types';

interface UseCompanyDetailsFormDataProps {
  data: UserResponse | null;
  onSubmit: any;
}

const submitTestAttribute = 'submit-company-details';
const submitText = 'Get started';
const fields = [
  {
    fieldName: 'company-name',
    label: 'Company Name',
    propName: 'name',
  },
  {
    fieldName: 'company-address',
    label: 'Company Address',
    propName: 'address',
  },
  {
    fieldName: 'company-vat',
    label: 'VAT number',
    propName: 'vatNumber',
  },
  {
    fieldName: 'company-reg-number',
    label: 'Registration number',
    propName: 'regNumber',
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
export const validationSchema = object({
  name: string().required().min(3).max(16),
  address: string().required(),
  vatNumber: string().required(),
  regNumber: string().required(),
  iban: string(),
  swift: string(),
});

export default function UseCompanyDetailsFormData(
  props: UseCompanyDetailsFormDataProps
): FormValidationProps {
  const { data: user, onSubmit } = props;
  const companyDetails = user?.companyDetails;
  const initialValues = {
    name: companyDetails?.name ?? '',
    address: companyDetails?.address ?? '',
    iban: companyDetails?.iban ?? '',
    vatNumber: companyDetails?.vatNumber ?? '',
    regNumber: companyDetails?.regNumber ?? '',
    swift: companyDetails?.swift ?? '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return { fields, submitTestAttribute, submitText, formik };
}
