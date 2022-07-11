import { screen } from '@testing-library/react';
import { renderTheme } from '../../tests/render-base.js';
import { Header } from '.';

describe('<Header />', () => {
  it('should render', () => {
    const { container } = renderTheme(<Header />);
    expect(container).toMatchSnapshot();
  });
});
