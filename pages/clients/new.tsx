import { AuthGuard } from '../../src/components/auth/AuthGuard';
import ClientFormContainer from '../../src/components/forms/ClientFormContainer';

export default function Clients() {
  return (
    <AuthGuard>
      <ClientFormContainer />
    </AuthGuard>
  );
}
