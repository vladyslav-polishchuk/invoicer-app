import { useFormik } from 'formik';
import PasswordField from './PasswordField';
import FormField from '../common/FormField';
import { loginValidationSchema } from '../../utils/formValidationSchema';
import Form from '../common/Form';

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
  const { getFieldProps } = formik;

  return (
    <Form formik={formik} submitText="Login" submitTestAttribute="submit-login">
      <FormField
        autoComplete="username"
        type="email"
        label="Email"
        {...getFieldProps('email')}
        formik={formik}
      />

      <PasswordField {...getFieldProps('password')} formik={formik} />
    </Form>
  );
}
