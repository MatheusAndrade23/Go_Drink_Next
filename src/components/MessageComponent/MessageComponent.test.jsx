import { screen } from '@testing-library/react';
import { renderTheme } from '../../tests/render-base.js';
import { MessageComponent } from '.';

describe('<MessageComponent />', () => {
  it('should render', () => {
    const { container } = renderTheme(
      <MessageComponent message="Wrong Password" />,
    );
    expect(container).toMatchSnapshot();
  });
});
