import { render } from '@testing-library/react';
import Footer from '../src/components/Footer';

it('Should render footer', () => {
  const { container } = render(<Footer />);

  expect(container).toMatchSnapshot();
});
