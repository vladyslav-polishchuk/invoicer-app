import { useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../api';
import AuthPage from './AuthPage';
import AuthRedirect from './AuthRedirect';
import useAsync from '../../hooks/useAsync';
import SignupForm from './SignupForm';

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

  return (
    <AuthPage title="Sign-up" error={error}>
      <SignupForm onSubmit={execute} />

      <AuthRedirect
        title="Already have an account?"
        linkText="Login"
        route="/login"
      />
    </AuthPage>
  );
}
