import { Stack } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import PasswordField from './PasswordField';
import FormField from '../common/FormField';
import { signupValidationSchema } from '../../utils/formValidationSchema';
import SubmitButton from './SubmitButton';

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
  const { handleSubmit, getFieldProps, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
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

          <SubmitButton data-test="submit-sign-up" isSubmitting={isSubmitting}>
            Get started
          </SubmitButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
