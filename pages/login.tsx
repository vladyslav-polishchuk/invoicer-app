import { NonAuthGuard } from '../src/components/auth/NonAuthGuard';
import LoginFormContainer from '../src/components/auth/LoginFormContainer';

export default function LoginPage() {
  return (
    <NonAuthGuard>
      <LoginFormContainer />
    </NonAuthGuard>
  );
}
