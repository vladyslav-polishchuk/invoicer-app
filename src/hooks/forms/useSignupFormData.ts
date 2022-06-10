import { object, ref } from 'yup';
import { useFormik } from 'formik';
import { name, email, password, FormProps, FormDataProps } from './common';

const submitTestAttribute = 'submit-sign-up';
const fields = [
  {
    fieldName: 'name',
    label: 'Name',
    propName: 'name',
    props: { autoComplete: 'name' },
  },
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
  {
    fieldName: 'confirm-password',
    label: 'Confirm password',
    propName: 'confirmPassword',
    type: 'password',
  },
];
const validationSchema = object({
  name,
  email,
  password,
  confirmPassword: password.oneOf(
    [ref('password'), null],
    'Passwords must match'
  ),
});

export default function useSignupFormData({
  onSubmit,
}: FormDataProps): FormProps {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit,
  });

  return { fields, submitTestAttribute, formik };
}
