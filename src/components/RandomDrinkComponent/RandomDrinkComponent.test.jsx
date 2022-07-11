import { screen } from '@testing-library/react';
import { renderTheme } from '../../tests/render-base.js';
import { RandomDrinkComponent } from '.';

describe('<RandomDrinkComponent />', () => {
  it('should render', () => {
    const { container } = renderTheme(<RandomDrinkComponent />);
    expect(container).toMatchSnapshot();
  });
});
