import { screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Heading } from '.';
import { renderTheme } from '../../tests/render-base.js';
import { DarkTheme as theme } from '../../styles/theme/DarkTheme';

describe('<Heading />', () => {
  it('should render with default values', () => {
    renderTheme(<Heading>Texto</Heading>);
    const heading = screen.getByRole('heading', { name: 'Texto' });

    expect(heading).toHaveStyle({
      color: theme.colors.thirdColor,
      'font-size': theme.fonts.sizes.xlarge,
      'text-transform': 'none',
    });
  });

  it('should render correct heading sizes', () => {
    const { rerender } = renderTheme(<Heading size="small">Texto</Heading>);
    const heading = screen.getByRole('heading', { name: 'Texto' });

    expect(heading).toHaveStyle({
      'font-size': theme.fonts.sizes.medium,
    });

    rerender(
      <ThemeProvider theme={theme}>
        <Heading size="big">Texto</Heading>
      </ThemeProvider>,
    );

    expect(screen.getByRole('heading', { name: 'Texto' })).toHaveStyle({
      'font-size': theme.fonts.sizes.xlarge,
    });

    rerender(
      <ThemeProvider theme={theme}>
        <Heading size="medium">Texto</Heading>
      </ThemeProvider>,
    );

    expect(screen.getByRole('heading', { name: 'Texto' })).toHaveStyle({
      'font-size': theme.fonts.sizes.large,
    });

    rerender(
      <ThemeProvider theme={theme}>
        <Heading size="huge">Texto</Heading>
      </ThemeProvider>,
    );

    expect(screen.getByRole('heading', { name: 'Texto' })).toHaveStyle({
      'font-size': theme.fonts.sizes.xhuge,
    });
  });

  it('should render correct font-size when using mobile', () => {
    const { rerender } = renderTheme(<Heading size="huge">Texto</Heading>);
    const heading = screen.getByRole('heading', { name: 'Texto' });

    expect(screen.getByRole('heading', { name: 'Texto' })).toHaveStyleRule(
      'font-size',
      theme.fonts.sizes.xlarge,
      {
        media: theme.media.lteMedium,
      },
    );
  });

  it('should render with uppercase letters', () => {
    renderTheme(<Heading uppercase={true}>Texto</Heading>);
    const heading = screen.getByRole('heading', { name: 'Texto' });

    expect(heading).toHaveStyle({
      'text-transform': 'uppercase',
    });
  });

  it('should render correct heading element', () => {
    const { container } = renderTheme(<Heading as="h4">Texto</Heading>);
    const heading = screen.getByRole('heading', { name: 'Texto' });
    const h4 = container.querySelector('h4');

    expect(h4.tagName.toLowerCase()).toBe('h4');
  });
});
