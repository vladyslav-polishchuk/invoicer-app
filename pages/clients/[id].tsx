import { useRouter } from 'next/router';
import { AuthGuard } from '../../src/components/auth/AuthGuard';
import ClientFormContainer from '../../src/components/ClientFormContainer';

export default function Client() {
  const router = useRouter();
  const { id } = router.query;
  const clientId = Array.isArray(id) ? id[0] : id;

  return (
    <AuthGuard>
      <ClientFormContainer clientId={clientId} />
    </AuthGuard>
  );
}
