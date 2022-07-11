import { screen } from '@testing-library/react';
import { renderTheme } from '../../tests/render-base.js';
import { Loading } from '.';

describe('<Loading />', () => {
  it('should render', () => {
    const { container } = renderTheme(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
