import { Stack } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../api';
import AuthPage from './AuthPage';
import AuthRedirect from './AuthRedirect';
import PasswordField from './PasswordField';
import FormField from '../common/FormField';
import useAsync from '../../hooks/useAsync';
import { loginValidationSchema } from '../../utils/formValidationSchema';
import SubmitButton from './SubmitButton';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store';
import { useAuthContext } from './AuthContext';

export default function LoginFormContainer() {
  const { setAuthToken } = useAuthContext();
  const router = useRouter();
  const dispatch = useDispatch();
  const { execute, error, value } = useAsync(api.login);

  useEffect(() => {
    if (value) {
      setAuthToken(value.token);
      dispatch(setUser(value));
    }
  }, [value]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: execute,
  });
  const { handleSubmit, getFieldProps, isSubmitting } = formik;
  const successMessage = router.query.successMessage ?? '';

  return (
    <AuthPage
      title="Login"
      error={error}
      success={
        Array.isArray(successMessage) ? successMessage[0] : successMessage
      }
    >
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

      <AuthRedirect
        title="No account?"
        linkText="Get started"
        route="/sign-up"
      />
    </AuthPage>
  );
}
