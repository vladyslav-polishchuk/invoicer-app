import Form from './Form';
import TextField from './fields/TextField';
import PasswordField from './fields/PasswordField';
import AutocompleteField from './fields/AutocompleteField';
import DatePickerField from './fields/DatePickerField';
import type { FormProps } from '../../../hooks/forms/common';
import type { ReactNode } from 'react';

interface FormContainerProps {
  formData: FormProps;
  children?: ReactNode;
}

export default function FormContainer({
  formData,
  children,
}: FormContainerProps) {
  const { fields, submitText, submitTestAttribute, formik } = formData;

  return (
    <Form
      formik={formik}
      submitText={submitText}
      submitTestAttribute={submitTestAttribute}
    >
      {fields.map(({ fieldName, label, propName, type, props }) => {
        const fieldProps = {
          key: fieldName,
          fieldName,
          label,
          ...formik.getFieldProps(propName),
          ...props,
        };

        switch (type) {
          case 'autocomplete':
            // @ts-expect-error
            return <AutocompleteField {...fieldProps} />;
          case 'date':
            // @ts-expect-error
            return <DatePickerField {...fieldProps} />;
          case 'password':
            return <PasswordField {...fieldProps} />;
          default:
            return <TextField {...fieldProps} />;
        }
      })}

      {children}
    </Form>
  );
}
