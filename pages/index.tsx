import Page from '../src/components/Page';
import { AuthGuard } from '../src/components/auth/AuthGuard';
import { Typography } from '@mui/material';

export default function Home() {
  return (
    <AuthGuard>
      <Page title="Invoicer | Home">
        <Typography variant="h1" align="center">
          This is the home page
        </Typography>
      </Page>
    </AuthGuard>
  );
}
