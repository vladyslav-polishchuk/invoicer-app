import { Delete } from '@mui/icons-material';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import TextField from './common/form/fields/TextField';

export default function InvoiceItemsContainer({ meta }: any) {
  const formik = useFormikContext();
  const [invoiceItems, setInvoiceItems] = useState(meta?.items ?? []);
  const addItemClick = () => {
    setInvoiceItems([...invoiceItems, {}]);
  };

  const invoiceItemNodes = invoiceItems.map((invoiceItem: any, i: number) => {
    return (
      <Box
        key={invoiceItem.description}
        data-test={`invoice-item-${i + 1}`}
        sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
      >
        <TextField
          fieldName={`invoice-item-description`}
          label={'Description'}
          {...formik.getFieldProps(`meta.items[${i}].description`)}
          size="small"
        />
        <TextField
          fieldName={`invoice-item-value`}
          label={'Value'}
          {...formik.getFieldProps(`meta.items[${i}].value`)}
          fullWidth={false}
          sx={{ flexGrow: '1', mt: 2 }}
          size="small"
        />
        <IconButton
          onClick={() => alert('remove')}
          sx={{ ml: 1, mt: 2, width: '40px', height: '40px' }}
        >
          <Delete />
        </IconButton>
      </Box>
    );
  });

  return (
    <>
      <Button fullWidth onClick={addItemClick}>
        Add Invoice Item
      </Button>

      <Stack spacing={3}>{invoiceItemNodes}</Stack>
    </>
  );
}
