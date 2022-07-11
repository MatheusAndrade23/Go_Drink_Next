import { screen } from '@testing-library/react';
import { renderTheme } from '../../tests/render-base.js';
import { SmallContainer } from '.';

describe('<SmallContainer />', () => {
  it('should render with default values', () => {
    renderTheme(<SmallContainer>Text</SmallContainer>);
    const smallContainer = screen.getByText('Text');

    expect(smallContainer).toHaveStyle({
      'flex-direction': 'column',
    });
  });

  it('should render in a row', () => {
    renderTheme(<SmallContainer disposition="row">Text</SmallContainer>);
    const smallContainer = screen.getByText('Text');

    expect(smallContainer).toHaveStyle({
      'flex-direction': 'row',
    });
  });
});
