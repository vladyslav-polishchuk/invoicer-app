import { AuthGuard } from '../src/components/auth/AuthGuard';
import CompanyDetailsContainer from '../src/components/forms/CompanyDetailsFormContainer';

export default function CompanyDetailsPage() {
  return (
    <AuthGuard>
      <CompanyDetailsContainer />
    </AuthGuard>
  );
}
