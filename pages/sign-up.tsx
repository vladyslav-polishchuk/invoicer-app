import { NonAuthGuard } from '../src/components/auth/NonAuthGuard';
import SignupFormContainer from '../src/components/auth/SignupFormContainer';

export default function SignupPage() {
  return (
    <NonAuthGuard>
      <SignupFormContainer />
    </NonAuthGuard>
  );
}
