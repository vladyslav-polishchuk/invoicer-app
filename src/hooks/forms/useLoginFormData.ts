import { object } from 'yup';
import { useFormik } from 'formik';
import { email, password, FormDataProps, FormProps } from './common';

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

export default function useLoginFormData({
  onSubmit,
}: FormDataProps): FormProps {
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
