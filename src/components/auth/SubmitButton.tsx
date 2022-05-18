import { Button, CircularProgress, type ButtonProps } from '@mui/material';
import type { ReactNode } from 'react';

interface SubmitButtonProps extends ButtonProps {
  children: ReactNode;
  isSubmitting: boolean;
}

export default function SubmitButton(props: SubmitButtonProps) {
  const { isSubmitting, children, ...buttonProps } = props;
  const submittingIndicator = isSubmitting ? (
    <CircularProgress sx={{ mr: 1 }} size="1rem" />
  ) : null;

  return (
    <Button
      fullWidth
      size="large"
      type="submit"
      variant="contained"
      sx={{ mt: 2 }}
      disabled={isSubmitting}
      {...buttonProps}
    >
      {submittingIndicator}
      {children}
    </Button>
  );
}
