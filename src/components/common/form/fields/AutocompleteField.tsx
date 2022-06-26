import { Autocomplete } from '@mui/material';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import TextField, { type TextFieldProps } from './TextField';

export type Option = { label: string; value: string };
type AutocompleteFieldProps = TextFieldProps & {
  name: string;
  value: Option;
  options: Array<Option>;
};

export default function AutocompleteField(props: AutocompleteFieldProps) {
  const { options, value, ...rest } = props;
  const { setFieldValue } = useFormikContext();
  const [autocompelteValue, setAutocompleteValue] = useState<Option | null>(
    value
  );

  return (
    <Autocomplete
      value={autocompelteValue}
      onChange={(_, newValue: Option | null) => {
        setAutocompleteValue(newValue);
        setFieldValue(props.name, newValue);
      }}
      isOptionEqualToValue={(option: Option, value: Option) =>
        option.value === value?.value
      }
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          {...rest}
          inputProps={{
            ...params.inputProps,
            value: typeof value === 'string' ? value : value?.label ?? '',
          }}
        />
      )}
    />
  );
}
