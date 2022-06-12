import { useEffect } from 'react';
import api from '../api';
import useAsync from '../hooks/useAsync';
import Spinner from './common/Spinner';
import InvoiceViewFormContainer from './InvoiceViewFormContainer';
import InvoiceEditFormContainer from './InvoiceEditFormContainer';
import { Alert, Container } from '@mui/material';

interface InoviceFormContainer {
  invoiceId?: string;
  viewMode?: boolean;
}

export default function InvoiceFormContainer(props: InoviceFormContainer) {
  const { invoiceId, viewMode } = props;
  const {
    execute: getInvoice,
    error: getInvoiceError,
    value: invoiceResponse,
  } = useAsync(api.getIncoice);
  const {
    execute: getClientNames,
    error: getClientNamesError,
    value: clientNamesResponse,
  } = useAsync(api.getClientNames);
  const error = getInvoiceError ?? getClientNamesError;

  useEffect(() => {
    getClientNames(undefined);

    if (invoiceId) {
      getInvoice(invoiceId);
    }
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

  if (!clientNamesResponse || (invoiceId && !invoiceResponse)) {
    return <Spinner />;
  }

  const invoice = invoiceResponse?.invoice;
  const clientNames = clientNamesResponse.clients;
  return viewMode ? (
    <InvoiceViewFormContainer invoice={invoice} />
  ) : (
    <InvoiceEditFormContainer
      invoice={invoice}
      clientNames={clientNames}
      error={error}
    />
  );
}
