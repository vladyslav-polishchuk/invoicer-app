import { AuthGuard } from '../../src/components/auth/AuthGuard';
import InvoiceFormContainer from '../../src/components/InvoiceFormContainer';

export default function Invoices() {
  return (
    <AuthGuard>
      <InvoiceFormContainer />
    </AuthGuard>
  );
}
