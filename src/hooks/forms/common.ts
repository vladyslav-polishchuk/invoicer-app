import type { FieldInputProps } from 'formik';

interface Formik extends Record<string, unknown> {
  getFieldProps: (fieldName: string) => FieldInputProps<{}>;
  resetForm: () => void;
}

export interface FormValidationProps {
  fields: {
    fieldName: string;
    label: string;
    propName: string;
    inputName?: string;
  }[];
  submitTestAttribute: string;
  submitText?: string;
  formik: Formik;
}
