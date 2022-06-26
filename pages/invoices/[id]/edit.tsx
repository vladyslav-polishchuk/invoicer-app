import { AuthGuard } from '../../../src/components/auth/AuthGuard';
import ClientNamesFetchContainer from '../../../src/components/ClientNamesFetchContainer';
import InvoiceFormContainer from '../../../src/components/forms/InvoiceFormContainer';
import useRouterQuery from '../../../src/hooks/useRouterQuery';

export default function Invoice() {
  const { id } = useRouterQuery();

  return (
    <AuthGuard>
      <ClientNamesFetchContainer>
        <InvoiceFormContainer invoiceId={id} />
      </ClientNamesFetchContainer>
    </AuthGuard>
  );
}
