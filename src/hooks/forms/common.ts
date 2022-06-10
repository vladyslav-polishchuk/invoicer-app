import { string } from 'yup';
import type { FieldInputProps } from 'formik';

export interface FormDataProps {
  onSubmit: (params: any) => Promise<void>;
}

export interface FormProps {
  fields: {
    fieldName: string;
    label: string;
    propName: string;
    type?: string;
    props?: Record<string, unknown>;
  }[];
  submitTestAttribute: string;
  submitText?: string;
  formik: Record<string, unknown> & {
    getFieldProps: (fieldName: string) => FieldInputProps<{}>;
    resetForm: () => void;
  };
}

const passwordLengthError =
  'Password length must be between 5 and 16 characters';
export const name = string().required('Name is required');
export const email = string()
  .email('Email must be a valid email address')
  .required('Email is required');
export const password = string()
  .required('Password is required')
  .min(5, passwordLengthError)
  .max(16, passwordLengthError);
