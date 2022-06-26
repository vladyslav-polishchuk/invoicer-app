import { getCookie, removeCookies } from 'cookies-next';
import { Alert, Container } from '@mui/material';
import { AuthGuard } from '../../../src/components/auth/AuthGuard';
import InvoiceViewFormContainer from '../../../src/components/forms/InvoiceViewFormContainer';
import { USER_TOKEN_KEY } from '../../../src/components/auth/AuthContext';
import api from '../../../src/api';
import type { Invoice } from '../../../src/api/types';
import type { GetServerSideProps } from 'next/types';

interface InvoicePrintProps {
  error?: string;
  invoice?: Invoice | null;
  print: boolean;
}

export default function ViewInvoice(props: InvoicePrintProps) {
  const { error, invoice, print } = props;

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Alert data-test="not-found-message" severity="error" variant="filled">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <AuthGuard>
      <InvoiceViewFormContainer invoice={invoice} print={print} />
    </AuthGuard>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userToken = getCookie(USER_TOKEN_KEY, context);
  if (!userToken) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  api.initApi(userToken.toString(), () => {
    removeCookies(USER_TOKEN_KEY);
  });

  const { id, print: printQuery } = context.query;
  const print = Array.isArray(printQuery) ? printQuery[0] : printQuery ?? false;
  const invoiceId = Array.isArray(id) ? id[0] : id;

  try {
    const invoiceData = await api.getIncoice(invoiceId!);
    const invoice = invoiceData?.invoice;
    return { props: { print, invoice } };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'Unknown error';
    return { props: { error } };
  }
};
