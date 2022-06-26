import Delete from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { FieldArray, useFormikContext } from 'formik';
import TextField from '../common/form/fields/TextField';
import type { Invoice } from '../../api/types';

export default function InvoiceItems() {
  const formik = useFormikContext();
  const invoice = formik.values as Invoice;

  return (
    <FieldArray name="meta.items" validateOnChange={false}>
      {(arrayHelpers) => (
        <>
          <Button
            fullWidth
            onClick={() => arrayHelpers.push({ value: '', description: '' })}
          >
            Add Invoice Item
          </Button>

          <Stack spacing={3}>
            {invoice?.meta?.items?.map((_, i) => (
              <Box
                key={i}
                data-test={`invoice-item-${i + 1}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
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
                  onClick={() => arrayHelpers.remove(i)}
                  sx={{ ml: 1, mt: 2, width: '40px', height: '40px' }}
                >
                  <Delete />
                </IconButton>
              </Box>
            ))}
          </Stack>
        </>
      )}
    </FieldArray>
  );
}
