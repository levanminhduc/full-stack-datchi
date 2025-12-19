import { createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palette';
import { typography } from './typography';
import { components } from './components';

export const createAppTheme = (mode: 'light' | 'dark'): Theme => {
  return createTheme({
    palette: mode === 'dark' ? darkPalette : lightPalette,
    typography,
    components,
  });
};

