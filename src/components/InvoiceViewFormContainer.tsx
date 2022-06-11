import { useEffect, useState } from 'react';
import FormPage from './common/form/FormPage';
import useRouterQuery from '../hooks/useRouterQuery';
import { InvoiceResponse } from '../api/types';

export default function InvoiceViewFormContainer({
  invoiceId,
  invoiceResponse,
}: {
  invoiceId?: string;
  invoiceResponse?: InvoiceResponse | null;
}) {
  const { print } = useRouterQuery();
  const [printTimeoutId, setPrintTimeoutId] = useState<number | null>(null);

  useEffect(() => {
    if (!print) return;

    if (printTimeoutId) {
      clearTimeout(printTimeoutId);
      setPrintTimeoutId(null);
    }

    const timeoutId = setTimeout(() => {
      window.print();
      setPrintTimeoutId(null);
    }, 100);
    setPrintTimeoutId(timeoutId as any as number);
  }, [print]);

  return (
    <FormPage title="Invoice info">
      {invoiceResponse?.invoice?.invoice_number}
    </FormPage>
  );
}
