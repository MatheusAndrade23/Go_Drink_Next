import { screen } from '@testing-library/react';
import { renderTheme } from '../../tests/render-base.js';
import { HeaderMenu } from '.';

describe('<HeaderMenu />', () => {
  it('should render', () => {
    const { container } = renderTheme(<HeaderMenu />);
    expect(container).toMatchSnapshot();
  });
});
