import { screen } from '@testing-library/react';
import { renderTheme } from '../../tests/render-base.js';
import { Logo } from '.';

describe('<Logo />', () => {
  it('should render', () => {
    const { container } = renderTheme(<Logo text="GODRINK" smallText="GD" />);
    expect(container).toMatchSnapshot();
  });
});
