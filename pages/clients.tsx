import { Typography } from '@mui/material';
import { AuthGuard } from '../src/components/auth/AuthGuard';

export default function Clients() {
  return (
    <AuthGuard>
      <Typography>Clients Page</Typography>
    </AuthGuard>
  );
}
