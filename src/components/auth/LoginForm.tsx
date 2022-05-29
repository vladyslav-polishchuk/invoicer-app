import { Stack } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import PasswordField from './PasswordField';
import FormField from '../common/FormField';
import { loginValidationSchema } from '../../utils/formValidationSchema';
import SubmitButton from './SubmitButton';

interface LoginFormProps {
  onSubmit: (params: { email: string; password: string }) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit,
  });
  const { handleSubmit, getFieldProps, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormField
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            formik={formik}
          />

          <PasswordField {...getFieldProps('password')} formik={formik} />
        </Stack>

        <SubmitButton data-test="submit-login" isSubmitting={isSubmitting}>
          Login
        </SubmitButton>
      </Form>
    </FormikProvider>
  );
}
