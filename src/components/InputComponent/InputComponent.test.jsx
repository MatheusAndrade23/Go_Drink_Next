import { screen } from '@testing-library/react';
import { renderTheme } from '../../tests/render-base.js';
import { InputComponent } from '.';

const mockFunction = () => {};

describe('<InputComponent />', () => {
  it('should render', () => {
    const { container } = renderTheme(
      <InputComponent
        placeholder="Something"
        name="test"
        handleChange={mockFunction}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
