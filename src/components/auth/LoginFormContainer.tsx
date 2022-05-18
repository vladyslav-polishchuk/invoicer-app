import { Stack } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '../../api';
import AuthPage from './AuthPage';
import AuthRedirect from './AuthRedirect';
import PasswordField from './PasswordField';
import FormField from '../common/FormField';
import useAsync from '../../hooks/useAsync';
import { loginValidationSchema } from '../../utils/formValidationSchema';
import { setToken, setUser } from '../../store';
import { setCookies } from 'cookies-next';
import SubmitButton from './SubmitButton';

//duplicate!!!
const USER_TOKEN_KEY = 'user_token';

export default function LoginFormContainer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { execute, error, value } = useAsync(api.login);

  useEffect(() => {
    if (value) {
      dispatch(setUser(value));
      dispatch(setToken(value.token));

      setCookies(USER_TOKEN_KEY, value.token);

      router.push('/');
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
        route="/register"
      />
    </AuthPage>
  );
}
