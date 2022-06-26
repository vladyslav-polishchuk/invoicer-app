import { useEffect } from 'react';
import { Alert, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import api from '../../api';
import useAsync from '../../hooks/useAsync';
import Spinner from '../common/Spinner';
import InvoiceEditFormContainer from './InvoiceEditFormContainer';
import type { InvoiceAppState } from '../../redux';

interface InoviceFormContainer {
  invoiceId?: string;
}

export default function InvoiceFormContainer(props: InoviceFormContainer) {
  const { invoiceId } = props;
  const { clientNames } = useSelector((state: InvoiceAppState) => state);
  const { execute, value, error } = useAsync(api.getIncoice);

  useEffect(() => {
    invoiceId && execute(invoiceId);
  }, [invoiceId]);

  if (error === 'Invoice not found') {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Alert data-test="not-found-message" severity="error" variant="filled">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!clientNames || (invoiceId && !value)) {
    return <Spinner />;
  }

  const invoice = value?.invoice;
  return (
    <InvoiceEditFormContainer
      invoice={invoice}
      clientNames={clientNames}
      error={error}
    />
  );
}
