import { screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { LinkComponent } from '.';
import { renderTheme } from '../../tests/render-base.js';
import { DarkTheme as theme } from '../../styles/theme/DarkTheme';

describe('<LinkComponent />', () => {
  it('should render with default values', () => {
    renderTheme(<LinkComponent link="/">My link</LinkComponent>);
    const linkComponent = screen.getByRole('link', { children: 'My link' });

    expect(linkComponent).toHaveStyle({
      'font-size': theme.fonts.sizes.small,
      'text-transform': 'none',
    });
  });

  it('should render correct LinkComponent sizes', () => {
    const { rerender } = renderTheme(
      <LinkComponent size="small" link="/">
        My link
      </LinkComponent>,
    );
    const linkComponent = screen.getByRole('link', {
      children: 'My link',
    });

    expect(linkComponent).toHaveStyle({
      'font-size': theme.fonts.sizes.small,
    });

    rerender(
      <ThemeProvider theme={theme}>
        <LinkComponent size="medium" link="/">
          My link
        </LinkComponent>
      </ThemeProvider>,
    );

    expect(screen.getByRole('link', { children: 'My link' })).toHaveStyle({
      'font-size': theme.fonts.sizes.medium,
    });

    rerender(
      <ThemeProvider theme={theme}>
        <LinkComponent size="xsmall" link="/">
          My link
        </LinkComponent>
      </ThemeProvider>,
    );

    expect(screen.getByRole('link', { children: 'My link' })).toHaveStyle({
      'font-size': theme.fonts.sizes.xsmall,
    });
  });

  it('should render with uppercase letters', () => {
    renderTheme(
      <LinkComponent uppercase={true} link="/">
        My link
      </LinkComponent>,
    );
    const linkComponent = screen.getByRole('link', {
      name: 'My link',
    });

    expect(linkComponent).toHaveStyle({
      'text-transform': 'uppercase',
    });
  });
});
