import { useState } from 'react';
import { useFormikContext } from 'formik';
import { Stack } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from './TextField';

type DatePickerProps = {
  name: string;
  value: number;
};

export default function DatePickerField(props: DatePickerProps) {
  const { setFieldValue } = useFormikContext();
  const [value, setValue] = useState<Date | null>(new Date(props.value));
  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
    setFieldValue(props.name, newValue?.getTime());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          {...props}
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              {...props}
              inputProps={{
                ...params.inputProps,
                value: !props.value ? '' : params.inputProps?.value,
              }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
