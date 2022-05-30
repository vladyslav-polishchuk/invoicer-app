import { Typography } from '@mui/material';
import { AuthGuard } from '../src/components/auth/AuthGuard';

export default function Invoices() {
  return (
    <AuthGuard>
      <Typography>Invoices Page</Typography>
    </AuthGuard>
  );
}
