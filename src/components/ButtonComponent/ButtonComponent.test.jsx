import { screen } from '@testing-library/react';
import { renderTheme } from '../../tests/render-base.js';
import { ThemeProvider } from 'styled-components';
import { ButtonComponent } from '.';
import { DarkTheme as theme } from '../../styles/theme/DarkTheme';

const mockFunction = () => {};

describe('<ButtonComponent />', () => {
  it('should render with default values', () => {
    renderTheme(
      <ButtonComponent handleSubmit={mockFunction}>Text</ButtonComponent>,
    );
    const buttonComponent = screen.getByRole('button', {
      name: 'Text',
    });

    expect(buttonComponent).toHaveStyle({
      color: theme.colors.thirdColor,
      'font-size': theme.fonts.sizes.small,
      'text-transform': 'none',
      'font-weight': 'bold',
    });
  });

  it('should render correct ButtonComponent sizes', () => {
    const { rerender } = renderTheme(
      <ButtonComponent size="medium" handleSubmit={mockFunction}>
        Text
      </ButtonComponent>,
    );
    const buttonComponent = screen.getByRole('button', {
      name: 'Text',
    });

    expect(buttonComponent).toHaveStyle({
      'font-size': theme.fonts.sizes.medium,
    });

    rerender(
      <ThemeProvider theme={theme}>
        <ButtonComponent size="xsmall" handleSubmit={mockFunction}>
          Text
        </ButtonComponent>
      </ThemeProvider>,
    );

    expect(screen.getByRole('button', { name: 'Text' })).toHaveStyle({
      'font-size': theme.fonts.sizes.xsmall,
    });

    rerender(
      <ThemeProvider theme={theme}>
        <ButtonComponent size="small" handleSubmit={mockFunction}>
          Text
        </ButtonComponent>
      </ThemeProvider>,
    );

    expect(screen.getByRole('button', { name: 'Text' })).toHaveStyle({
      'font-size': theme.fonts.sizes.small,
    });
  });

  it('should render with uppercase letters', () => {
    renderTheme(
      <ButtonComponent uppercase={true} handleSubmit={mockFunction}>
        Text
      </ButtonComponent>,
    );
    const buttonComponent = screen.getByRole('button', {
      name: 'Text',
    });

    expect(buttonComponent).toHaveStyle({
      'text-transform': 'uppercase',
    });
  });

  it('should render with normal weight letters', () => {
    renderTheme(
      <ButtonComponent bold={false} handleSubmit={mockFunction}>
        Text
      </ButtonComponent>,
    );
    const buttonComponent = screen.getByRole('button', {
      name: 'Text',
    });

    expect(buttonComponent).toHaveStyle({
      'font-weight': 'normal',
    });
  });

  it('should render the right model', () => {
    renderTheme(
      <ButtonComponent model="icon" handleSubmit={mockFunction}>
        Text
      </ButtonComponent>,
    );
    const buttonComponent = screen.getByRole('button', {
      name: 'Text',
    });

    expect(buttonComponent).toHaveStyle({
      'border-radius': '50%',
    });
  });
});
