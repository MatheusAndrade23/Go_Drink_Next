import { screen } from '@testing-library/react';
import { renderTheme } from '../../tests/render-base.js';
import { LanguageSwitcher } from '.';

describe('<LanguageSwitcher />', () => {
  it('should render', () => {
    const { container } = renderTheme(<LanguageSwitcher />);
    expect(container).toMatchSnapshot();
  });
});
