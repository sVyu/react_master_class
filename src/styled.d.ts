import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    blockColor: string;
    textColor: string;
    accentColor: string;
  }
}
