import { SerializedStyles } from "styled-components";
import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      Primary: string;
      PrimaryHard: string;
      PrimaryActive: string;
      White: string;
      WhiteButtonActive: string;
      PrimaryDisable: string;
      PuppleButton: string;
      PuppleActive: string;
      ErrorMsgRed: string;
      PrimaryLight: string;
    };
    black: {
      black0: string;
      black1: string;
      black2: string;
    };
    gray: {
      gray1: string;
      gray2: string;
      gray3: string;
      gray4: string;
      gray5: string;
      gray6: string;
      gray7: string;
      gray8: string;
      gray9: string;
    };
    fontsize: {
      s12h18: SerializedStyles;
      s14h21: SerializedStyles;
      s16h24: SerializedStyles;
      s18h27: SerializedStyles;
      s20h30: SerializedStyles;
    };
    shadow: {
      onlyBottom: string;
      dp01: string;
      dp02: string;
      dp03: string;
      dp04: string;
      inset: string;
    };
  }
}
