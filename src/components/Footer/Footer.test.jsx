import { screen } from '@testing-library/react';
import { renderTheme } from '../../tests/render-base.js';
import { Footer } from '.';

describe('<Footer />', () => {
  it('should render', () => {
    const { container } = renderTheme(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
