import { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import Page from '../common/Page';
import type { Invoice } from '../../api/types';

interface InvoiceViewFormProps {
  invoice?: Invoice | null;
  print: boolean;
}

export default function InvoiceViewFormContainer(props: InvoiceViewFormProps) {
  const { invoice, print } = props;
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

  const rows = [
    ['Date', new Date(invoice?.date ?? '').toDateString(), 'invoice-date'],
    [
      'Due Date',
      new Date(invoice?.dueDate ?? '').toDateString(),
      'invoice-due-date',
    ],
    ['Number', invoice?.invoice_number, 'invoice-number'],
    ['Project Code', invoice?.projectCode, 'invoice-project-code'],
    ['Total Price', invoice?.value, 'invoice-total'],
  ];
  const invoiceItems = invoice?.meta?.items ?? [
    { description: 'No Invoice Items', value: '-' },
  ];

  return (
    <Page title="Invoice info">
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          minHeight: '80vh',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>General Invoice Info</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(([label, value, dataTest]) => (
                <TableRow
                  key={label}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {label}
                  </TableCell>
                  <TableCell align="right" data-test={dataTest}>
                    {value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Paper sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice Items</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceItems.map(({ description, value }, i) => (
                <TableRow
                  key={description}
                  data-test={`invoice-item-${i + 1}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    data-test="invoice-item-description"
                  >
                    {description}
                  </TableCell>
                  <TableCell align="right" data-test="invoice-item-value">
                    {value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Page>
  );
}
