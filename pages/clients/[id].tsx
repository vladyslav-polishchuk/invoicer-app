import { AuthGuard } from '../../src/components/auth/AuthGuard';
import ClientFormContainer from '../../src/components/forms/ClientFormContainer';
import useRouterQuery from '../../src/hooks/useRouterQuery';

export default function Client() {
  const { id } = useRouterQuery();

  return (
    <AuthGuard>
      <ClientFormContainer clientId={id} />
    </AuthGuard>
  );
}
