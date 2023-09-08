import { css, SerializedStyles } from 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    gray: {
      default: string;
      gray10: string;
      gray20: string;
      gray30: string;
      gray40: string;
      gray50: string;
      gray60: string;
      gray70: string;
      gray80: string;
      gray90: string;
    };
    palette: {
      orange: string;
    };
    shadow: string;
    textSize: {
      S12W400: SerializedStyles;
      S12W500: SerializedStyles;
      S12W700: SerializedStyles;
      S14W400: SerializedStyles;
      S14W500: SerializedStyles;
      S14W700: SerializedStyles;
      S16W400: SerializedStyles;
      S16W500: SerializedStyles;
      S16W700: SerializedStyles;
      S18W400: SerializedStyles;
      S18W500: SerializedStyles;
      S18W700: SerializedStyles;
      S20W400: SerializedStyles;
      S20W500: SerializedStyles;
      S20W700: SerializedStyles;
      S28W400: SerializedStyles;
      S28W500: SerializedStyles;
      S28W700: SerializedStyles;
      S32W400: SerializedStyles;
      S32W500: SerializedStyles;
      S32W700: SerializedStyles;
      S64W700: SerializedStyles;
    };
    media: {
      mobile: string;
    };
  }
}
