import { NonAuthGuard } from '../src/components/auth/NonAuthGuard';
import RegisterFormContainer from '../src/components/auth/RegisterFormContainer';

export default function RegisterPage() {
  return (
    <NonAuthGuard>
      <RegisterFormContainer />
    </NonAuthGuard>
  );
}
