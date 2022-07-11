import { screen } from '@testing-library/react';
import { renderTheme } from '../../tests/render-base.js';
import { AuthLoading } from '.';

describe('<AuthLoading />', () => {
  it('should render', () => {
    const { container } = renderTheme(<AuthLoading />);
    expect(container).toMatchSnapshot();
  });
});
