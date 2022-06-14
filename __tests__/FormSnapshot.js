import { render } from '@testing-library/react';
import FormContainer from '../src/components/common/form/FormContainer';

const fields = [
  {
    fieldName: 'email',
    label: 'Email',
    propName: 'email',
  },
  {
    fieldName: 'password',
    label: 'Password',
    propName: 'password',
    type: 'password',
  },
  {
    fieldName: 'date',
    label: 'Date',
    propName: 'date',
    type: 'date',
  },
  {
    fieldName: 'dropdown',
    label: 'Dropdown',
    propName: 'dropdown',
    type: 'autocomplete',
    props: { options: [{ label: 'option1', value: 'value1' }] },
  },
];
const formik = { getFieldProps: () => ({}) };

it('Should render form with all possible field types', () => {
  const formData = { fields, formik };

  const { container } = render(<FormContainer formData={formData} />);

  expect(container).toMatchSnapshot();
});
