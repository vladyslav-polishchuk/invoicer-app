import { useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../api';
import AuthPage from './AuthPage';
import AuthRedirect from './AuthRedirect';
import useAsync from '../../hooks/useAsync';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store';
import { useAuthContext } from './AuthContext';
import LoginForm from './LoginForm';

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
  const successMessage = router.query.successMessage ?? '';

  return (
    <AuthPage
      title="Login"
      error={error}
      success={
        Array.isArray(successMessage) ? successMessage[0] : successMessage
      }
    >
      <LoginForm onSubmit={execute} />

      <AuthRedirect
        title="No account?"
        linkText="Get started"
        route="/signup"
      />
    </AuthPage>
  );
}
