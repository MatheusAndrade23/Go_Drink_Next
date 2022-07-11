import { screen } from '@testing-library/react';
import { renderTheme } from '../../tests/render-base.js';
import { ThemeSwitcher } from '.';

describe('<ThemeSwitcher />', () => {
  it('should render', () => {
    const { container } = renderTheme(<ThemeSwitcher />);
    expect(container).toMatchSnapshot();
  });
});
