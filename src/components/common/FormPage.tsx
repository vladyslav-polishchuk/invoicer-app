import BackgroundImage from '../../../images/background.jpeg';
import { Alert, Typography, Container, Paper, Box } from '@mui/material';
import Page from './Page';
import type { ReactNode } from 'react';

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
  return (
    <Page title={title}>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          minHeight: '90vh',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 1,
          padding: 4,
        }}
      >
        <Paper
          sx={{ padding: 4, boxShadow: `10px 10px 10px rgb(0 0 0 / 60%)` }}
        >
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
      <Box
        sx={{
          position: 'fixed',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          backgroundImage: `url(${BackgroundImage.src})`,
          backgroundColor: '#efe0cb',
          filter: 'blur(4px)',
        }}
      />
    </Page>
  );
}
