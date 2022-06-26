import { AuthGuard } from '../../src/components/auth/AuthGuard';
import ClientNamesFetchContainer from '../../src/components/ClientNamesFetchContainer';
import InvoiceFormContainer from '../../src/components/forms/InvoiceFormContainer';

export default function Invoices() {
  return (
    <AuthGuard>
      <ClientNamesFetchContainer>
        <InvoiceFormContainer />
      </ClientNamesFetchContainer>
    </AuthGuard>
  );
}
