import { Button, CircularProgress, Stack } from '@mui/material';
import { FormikProvider, Form as FormikForm } from 'formik';
import type { ReactNode } from 'react';

interface FormProps {
  children: ReactNode;
  // any used as a workaround because formik does not export type for this object
  // should be updated when corresponding issue is resolved
  // https://github.com/jaredpalmer/formik/issues/2924
  formik: any;
  submitTestAttribute: string;
  submitText?: string;
}

export default function Form({
  children,
  formik,
  submitText,
  submitTestAttribute,
}: FormProps) {
  const { handleSubmit, isSubmitting } = formik;
  const submittingIndicator = isSubmitting ? (
    <CircularProgress sx={{ mr: 1 }} size="1rem" />
  ) : null;

  return (
    <FormikProvider value={formik}>
      <FormikForm autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {children}

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={isSubmitting}
            data-test={submitTestAttribute}
          >
            {submittingIndicator}
            {submitText ?? 'Submit'}
          </Button>
        </Stack>
      </FormikForm>
    </FormikProvider>
  );
}
