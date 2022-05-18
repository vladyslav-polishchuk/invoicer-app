import { AuthGuard } from '../src/components/auth/AuthGuard';
import CompanyDetailsContainer from '../src/components/CompanyDetailsContainer';

export default function CompanyDetailsPage() {
  return (
    <AuthGuard>
      <CompanyDetailsContainer />
    </AuthGuard>
  );
}
