import { object, string } from 'yup';
import { useFormik } from 'formik';
import { name, email, type FormProps, type FormDataProps } from './common';
import type { Client } from '../../api/types';

type UseClientFormDataProps = FormDataProps & {
  data: {
    success: boolean;
    client: Client;
  } | null;
};

const submitTestAttribute = 'submit-client';
const fields = [
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
const validationSchema = object({
  email: email,
  name: name.min(3),
  companyDetails: object({
    name: string().required(),
    address: string().required(),
    vatNumber: string().required(),
    regNumber: string().required(),
    iban: string().required(),
    swift: string().required(),
  }),
});

export default function useClientFormData(
  props: UseClientFormDataProps
): FormProps {
  const { data, onSubmit } = props;
  const client = data?.client;
  const companyDetails = client?.companyDetails;
  const initialValues = {
    id: client?.id,
    email: client?.email ?? '',
    name: client?.name ?? '',
    companyDetails: {
      name: companyDetails?.name ?? '',
      address: companyDetails?.address ?? '',
      regNumber: companyDetails?.regNumber ?? '',
      iban: companyDetails?.iban ?? '',
      swift: companyDetails?.swift ?? '',
      vatNumber: companyDetails?.vatNumber ?? '',
    },
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit,
  });

  return { fields, submitTestAttribute, formik };
}
