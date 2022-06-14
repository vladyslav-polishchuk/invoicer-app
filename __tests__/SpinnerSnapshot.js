import { render } from '@testing-library/react';
import Spinner from '../src/components/common/Spinner';

it('Should render spinner', () => {
  const { container } = render(<Spinner />);

  expect(container).toMatchSnapshot();
});
