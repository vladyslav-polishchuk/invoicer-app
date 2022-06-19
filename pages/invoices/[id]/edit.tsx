import { AuthGuard } from '../../../src/components/auth/AuthGuard';
import InvoiceFormContainer from '../../../src/components/forms/InvoiceFormContainer';
import useRouterQuery from '../../../src/hooks/useRouterQuery';

export default function Invoice() {
  const { id } = useRouterQuery();

  return (
    <AuthGuard>
      <InvoiceFormContainer invoiceId={id} />
    </AuthGuard>
  );
}
