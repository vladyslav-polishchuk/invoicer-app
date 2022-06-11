import { useEffect } from 'react';
import api from '../api';
import useAsync from '../hooks/useAsync';
import Spinner from './common/Spinner';
import InvoiceViewFormContainer from './InvoiceViewFormContainer';
import InvoiceEditFormContainer from './InvoiceEditFormContainer';

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
  }, []);

  if (!clientNamesResponse || (invoiceId && !invoiceResponse)) {
    return <Spinner />;
  }

  return viewMode ? (
    <InvoiceViewFormContainer
      invoiceId={invoiceId}
      invoiceResponse={invoiceResponse}
    />
  ) : (
    <InvoiceEditFormContainer
      invoiceId={invoiceId}
      invoiceResponse={invoiceResponse}
      clientNamesResponse={clientNamesResponse}
      error={error}
    />
  );
}
