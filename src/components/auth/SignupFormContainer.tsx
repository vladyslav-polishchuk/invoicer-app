import { Button, Stack } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../api';
import AuthPage from './AuthPage';
import AuthRedirect from './AuthRedirect';
import PasswordField from './PasswordField';
import FormField from '../common/FormField';
import useAsync from '../../hooks/useAsync';
import { signupValidationSchema } from '../../utils/formValidationSchema';
import SubmitButton from './SubmitButton';

export default function SignupFormContainer() {
  const router = useRouter();
  const { execute, error, value } = useAsync(api.signup);

  useEffect(() => {
    value &&
      router.push(
        {
          pathname: '/login',
          query: { successMessage: 'Account created. Please login' },
        },
        '/login'
      );
  }, [value]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupValidationSchema,
    onSubmit: execute,
  });
  const { handleSubmit, getFieldProps, isSubmitting } = formik;

  return (
    <AuthPage title="Sign-up" error={error}>
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

            <SubmitButton
              data-test="submit-sign-up"
              isSubmitting={isSubmitting}
            >
              Get started
            </SubmitButton>
          </Stack>
        </Form>
      </FormikProvider>

      <AuthRedirect
        title="Already have an account?"
        linkText="Login"
        route="/login"
      />
    </AuthPage>
  );
}
