import {
  TextField,
  type FormHelperTextProps,
  type TextFieldProps,
} from '@mui/material';

export type FormFieldProps = TextFieldProps & {
  fieldName?: string;
  // any used as a workaround because formik does not export type for this object
  // should be updated when corresponding issue is resolved
  // https://github.com/jaredpalmer/formik/issues/2924
  formik: any;
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
  const { fieldName, formik, ...fieldProps } = props;
  const name = props.name;
  const { touched, errors } = formik;
  const errorMessage =
    name &&
    getFormMetadataValue(name, touched) &&
    getFormMetadataValue(name, errors);

  return (
    <TextField
      fullWidth
      inputProps={{
        'data-test': fieldName ?? name,
      }}
      FormHelperTextProps={
        {
          'data-test': `${fieldName ?? name}-error`,
        } as Partial<FormHelperTextProps>
      }
      error={Boolean(errorMessage)}
      helperText={errorMessage}
      {...fieldProps}
    />
  );
}
