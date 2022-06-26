import {
  TextField as MuiTextField,
  type FormHelperTextProps,
  type TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import { useFormikContext } from 'formik';

export type TextFieldProps = MuiTextFieldProps & {
  fieldName?: string;
};

const getFormMetadataValue = (
  propName: string,
  object: Record<string, unknown>
) => {
  return propName
    .split(/[\.\[\]]/)
    .reduce(
      (acc: unknown, nestedPropertyName: string) =>
        acc && typeof acc === 'object' && nestedPropertyName
          ? (acc = (acc as Record<string, unknown>)[nestedPropertyName])
          : acc,
      object
    ) as string;
};

export default function TextField(props: TextFieldProps) {
  const { fieldName, ...fieldProps } = props;
  const name = props.name;
  const { touched, errors } = useFormikContext();
  const errorMessage =
    name &&
    getFormMetadataValue(name, touched) &&
    getFormMetadataValue(name, errors);

  return (
    <MuiTextField
      fullWidth
      {...fieldProps}
      inputProps={{
        'data-test': fieldName ?? name,
        ...fieldProps?.inputProps,
      }}
      FormHelperTextProps={
        {
          'data-test': `${fieldName ?? name}-error`,
        } as FormHelperTextProps
      }
      error={Boolean(errorMessage)}
      helperText={errorMessage}
    />
  );
}
