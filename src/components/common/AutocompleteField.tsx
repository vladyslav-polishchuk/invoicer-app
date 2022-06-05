import { Autocomplete } from '@mui/material';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import FormField, { type FormFieldProps } from './FormField';

type Option = { label: string; value: unknown };
type AutocompleteFieldProps = FormFieldProps & {
  name: string;
  options: Array<Option>;
};

export default function AutocompleteField(props: AutocompleteFieldProps) {
  const { setFieldValue } = useFormikContext();
  const { options, fieldName, label } = props;
  const [value, setValue] = useState(props.value);
  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      value={value as Option}
      onChange={(_, newValue: Option | null) => {
        setValue(newValue);
        setFieldValue(props.name, newValue);
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      isOptionEqualToValue={(option: Option, value: Option) =>
        option.value === value.value
      }
      options={options}
      renderInput={(params) => (
        <FormField {...params} fieldName={fieldName} label={label} />
      )}
    />
  );
}
