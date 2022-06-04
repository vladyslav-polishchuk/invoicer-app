import { useFormik } from 'formik';
import PasswordField from './PasswordField';
import FormField from '../common/FormField';
import { signupValidationSchema } from '../../common/formValidationSchema';
import Form from '../common/Form';

interface SignupFormProps {
  onSubmit: (params: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupValidationSchema,
    onSubmit,
  });
  const { getFieldProps } = formik;

  return (
    <Form
      formik={formik}
      submitText="Get started"
      submitTestAttribute="submit-sign-up"
    >
      <FormField
        autoComplete="name"
        label="Name"
        {...getFieldProps('name')}
        formik={formik}
      />

      <FormField
        autoComplete="username"
        type="email"
        label="Email"
        {...getFieldProps('email')}
        formik={formik}
      />

      <PasswordField {...getFieldProps('password')} formik={formik} />

      <PasswordField
        fieldName="confirm-password"
        label="Confirm password"
        {...getFieldProps('confirmPassword')}
        formik={formik}
      />
    </Form>
  );
}
