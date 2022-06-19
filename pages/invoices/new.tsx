import { AuthGuard } from '../../src/components/auth/AuthGuard';
import InvoiceFormContainer from '../../src/components/forms/InvoiceFormContainer';

export default function Invoices() {
  return (
    <AuthGuard>
      <InvoiceFormContainer />
    </AuthGuard>
  );
}
