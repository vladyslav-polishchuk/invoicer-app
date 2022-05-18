import {
  TextField,
  type FormHelperTextProps,
  type TextFieldProps,
} from '@mui/material';
import { type FormikErrors, type FormikTouched } from 'formik';

export type FormFieldProps = TextFieldProps & {
  fieldName?: string;
  formik: {
    touched: FormikTouched<Record<string, unknown>>;
    errors: FormikErrors<Record<string, unknown>>;
  };
};

export default function FormField(props: FormFieldProps) {
  const { fieldName, formik, ...fieldProps } = props;
  const name = props.name;
  const { touched, errors } = formik;
  const errorMessage = name && touched[name] && errors[name];

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
