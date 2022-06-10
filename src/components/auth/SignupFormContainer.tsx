import { useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../api';
import FormPage from '../common/form/FormPage';
import AuthRedirect from './AuthRedirect';
import useAsync from '../../hooks/useAsync';
import useSignupFormData from '../../hooks/forms/useSignupFormData';
import FormContainer from '../common/form/FormContainer';

export default function SignupFormContainer() {
  const router = useRouter();
  const { execute: onSubmit, error, value } = useAsync(api.signup);
  const formData = useSignupFormData({ onSubmit });

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

  return (
    <FormPage title="Sign-up" error={error}>
      <FormContainer formData={formData} />

      <AuthRedirect
        title="Already have an account?"
        linkText="Login"
        route="/login"
      />
    </FormPage>
  );
}
