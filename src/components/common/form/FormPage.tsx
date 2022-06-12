import { Alert, Typography, Container, Paper } from '@mui/material';
import Page from '../Page';
import type { ReactNode } from 'react';
import useScreenSize from '../../../hooks/useScreenSize';

interface FormPageProps {
  title: string;
  error?: string | null;
  success?: string | null;
  successTestAttribute?: string;
  info?: string | null;
  children: ReactNode;
}

export default function FormPage({
  children,
  title,
  error,
  success,
  successTestAttribute,
  info,
}: FormPageProps) {
  const { isMobile } = useScreenSize();
  const padding = isMobile ? 3 : 4;

  return (
    <Page title={title}>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          minHeight: '90vh',
          flexDirection: 'column',
          justifyContent: 'center',
          padding,
        }}
      >
        <Paper sx={{ padding, boxShadow: `10px 10px 10px rgb(0 0 0 / 60%)` }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }} align="center">
            {title}
          </Typography>

          {error && (
            <Alert
              data-test="form-error"
              severity="error"
              variant="filled"
              sx={{ mb: 3 }}
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert
              data-test={successTestAttribute ?? 'success-message'}
              variant="filled"
              sx={{ mb: 3 }}
            >
              {success}
            </Alert>
          )}

          {info && (
            <Alert
              data-test="info-message"
              severity="info"
              variant="filled"
              sx={{ mb: 3 }}
            >
              {info}
            </Alert>
          )}

          {children}
        </Paper>
      </Container>
    </Page>
  );
}
