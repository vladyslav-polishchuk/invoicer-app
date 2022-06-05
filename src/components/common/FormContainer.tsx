import Form from './Form';
import FormField from './FormField';
import type { FormValidationProps } from '../../hooks/forms/common';

interface FormContainerProps {
  formData: FormValidationProps;
}

export default function FormContainer({ formData }: FormContainerProps) {
  const { fields, submitText, submitTestAttribute, formik } = formData;

  return (
    <Form
      formik={formik}
      submitText={submitText}
      submitTestAttribute={submitTestAttribute}
    >
      {fields.map(({ fieldName, label, propName, inputName }) => (
        <FormField
          key={fieldName}
          fieldName={fieldName}
          label={label}
          {...formik.getFieldProps(propName)}
          inputProps={{
            'data-test': inputName ? inputName : fieldName,
          }}
        />
      ))}
    </Form>
  );
}
