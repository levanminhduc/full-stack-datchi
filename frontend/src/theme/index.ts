import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palette';
import { typography } from './typography';
import { components } from './components';

export const createAppTheme = (mode: 'light' | 'dark'): Theme => {
  const theme = createTheme({
    palette: mode === 'dark' ? darkPalette : lightPalette,
    typography,
    components,
  });

  return responsiveFontSizes(theme);
};

