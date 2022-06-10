import { object } from 'yup';
import { useFormik } from 'formik';
import { email, FormValidationProps, password } from './common';

interface UseLoginFormDataProps {
  onSubmit: (params: { email: string; password: string }) => Promise<void>;
}

const submitTestAttribute = 'submit-login';
const fields = [
  {
    fieldName: 'email',
    label: 'Email',
    propName: 'email',
    props: { autoComplete: 'username', type: 'email' },
  },
  {
    fieldName: 'password',
    label: 'Password',
    propName: 'password',
    type: 'password',
  },
];
const validationSchema = object({ email, password });

export default function useLoginFormData(
  props: UseLoginFormDataProps
): FormValidationProps {
  const { onSubmit } = props;
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  return { fields, submitTestAttribute, formik };
}
