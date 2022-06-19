import { useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../api';
import FormPage from '../common/form/FormPage';
import AuthRedirect from './AuthRedirect';
import useAsync from '../../hooks/useAsync';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux';
import { useAuthContext } from './AuthContext';
import FormContainer from '../common/form/FormContainer';
import useLoginFormData from '../../hooks/forms/useLoginFormData';

export default function LoginFormContainer() {
  const { setAuthToken } = useAuthContext();
  const router = useRouter();
  const dispatch = useDispatch();
  const { execute: onSubmit, error, value } = useAsync(api.login);

  useEffect(() => {
    if (value) {
      setAuthToken(value.token);
      dispatch(setUser(value));
    }
  }, [value]);
  const successMessage = router.query.successMessage ?? '';
  const formData = useLoginFormData({ onSubmit });

  return (
    <FormPage
      title="Login"
      error={error}
      success={
        Array.isArray(successMessage) ? successMessage[0] : successMessage
      }
    >
      <FormContainer formData={formData} />

      <AuthRedirect
        title="No account?"
        linkText="Get started"
        route="/signup"
      />
    </FormPage>
  );
}
