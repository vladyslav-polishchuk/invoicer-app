import { Component, type ReactNode } from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ minHeight: '100vh' }}>
          <Alert severity="error" variant="filled" sx={{ alignSelf: 'center' }}>
            <AlertTitle>Unexpected error occured</AlertTitle>
            Try to refresh page to proceed
          </Alert>
        </Box>
      );
    }

    return <>{this.props.children}</>;
  }
}
