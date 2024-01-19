import Router from './Router';
import { GlobalStyle } from './GlobalStyle';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { DarkTheme, WhiteTheme } from './theme';

export const App = () => {
  const [theme, setTheme] = useState<DefaultTheme>(WhiteTheme);
  const handleChangeTheme = () => {
    if (theme === WhiteTheme) setTheme(DarkTheme);
    else setTheme(WhiteTheme);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router onChangeTheme={handleChangeTheme} />
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </>
  );
};
