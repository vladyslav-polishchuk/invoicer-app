import {
  TextField,
  type FormHelperTextProps,
  type TextFieldProps,
} from '@mui/material';
import { useFormikContext } from 'formik';

export type FormFieldProps = TextFieldProps & {
  fieldName?: string;
};

const getFormMetadataValue = (
  propName: string,
  object: Record<string, unknown>
) => {
  return propName
    .split('.')
    .reduce((acc: unknown, nestedPropertyName: string) => {
      if (acc && typeof acc === 'object') {
        return (acc = (acc as Record<string, unknown>)[nestedPropertyName]);
      }
    }, object) as string;
};

export default function FormField(props: FormFieldProps) {
  const { fieldName, ...fieldProps } = props;
  const name = props.name;
  const { touched, errors } = useFormikContext();
  const errorMessage =
    name &&
    getFormMetadataValue(name, touched) &&
    getFormMetadataValue(name, errors);

  return (
    <TextField
      fullWidth
      {...fieldProps}
      inputProps={{
        'data-test': fieldName ?? name,
        ...fieldProps?.inputProps,
      }}
      FormHelperTextProps={
        {
          'data-test': `${fieldName ?? name}-error`,
        } as Partial<FormHelperTextProps>
      }
      error={Boolean(errorMessage)}
      helperText={errorMessage}
    />
  );
}
