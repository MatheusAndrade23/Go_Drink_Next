import { screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { TextComponent } from '.';
import { renderTheme } from '../../tests/render-base.js';
import { DarkTheme as theme } from '../../styles/theme/DarkTheme';

describe('<TextComponent />', () => {
  it('should render with default values', () => {
    renderTheme(<TextComponent>Text</TextComponent>);
    const textComponent = screen.getByText('Text');

    expect(textComponent).toHaveStyle({
      color: theme.colors.primaryColor,
      'font-size': theme.fonts.sizes.small,
      'text-transform': 'none',
    });
  });

  it('should render correct TextComponent sizes', () => {
    const { rerender } = renderTheme(
      <TextComponent size="small">Text</TextComponent>,
    );
    const textComponent = screen.getByText('Text');

    expect(textComponent).toHaveStyle({
      'font-size': theme.fonts.sizes.small,
    });

    rerender(
      <ThemeProvider theme={theme}>
        <TextComponent size="medium">Text</TextComponent>
      </ThemeProvider>,
    );

    expect(screen.getByText('Text')).toHaveStyle({
      'font-size': theme.fonts.sizes.medium,
    });

    rerender(
      <ThemeProvider theme={theme}>
        <TextComponent size="xsmall">Text</TextComponent>
      </ThemeProvider>,
    );

    expect(screen.getByText('Text')).toHaveStyle({
      'font-size': theme.fonts.sizes.xsmall,
    });
  });

  it('should render with uppercase letters', () => {
    renderTheme(<TextComponent uppercase={true}>Text</TextComponent>);
    const textComponent = screen.getByText('Text');

    expect(textComponent).toHaveStyle({
      'text-transform': 'uppercase',
    });
  });
});
