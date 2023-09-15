import { css } from "styled-components";

export const Theme = {
  color: {
    Primary: "#279eff",
    PrimaryHard: "#25429d",
    PrimaryActive: "#1d8ce7",
    White: "white",
    WhiteButtonActive: "#d9d9d9",
    PrimaryDisable: "#9ac5f4",
    PuppleButton: "#e9eeff",
    PuppleActive: "#f6f8ff",
    ErrorMsgRed: "#ff2727",
    PrimaryLight: "78c1f3",
  },
  black: {
    black0: "#000000",
    black1: "#404040",
    black2: "#030303",
  },
  gray: {
    gray1: "#595959",
    gray2: "#665e5e",
    gray3: "#676767",
    gray4: "#a6a6a6",
    gray5: "#dee2e9",
    gray6: "#f1f1f1",
    gray7: "#d9d9d9",
    gray8: "#8c8c8c",
    gray9: "#a4a4a4",
  },
  fontsize: {
    s12h18: css`
      font-size: 12px;
      line-height: 18px;
    `,
    s14h21: css`
      font-size: 14px;
      line-height: 21px;
    `,
    s16h24: css`
      font-size: 16px;
      line-height: 24px;
    `,
    s18h27: css`
      font-size: 18px;
      line-height: 27px;
    `,
    s20h30: css`
      font-size: 20px;
      line-height: 30px;
    `,
  },
  shadow: {
    onlyBottom: "0px 4px 4px rgba(39,44, 86, 0.06)",
    dp01: "0px 10px 34px 0px rgba(39, 44, 86, 0.08)",
    dp02: "0px 4px 12px 0px rgba(39, 44, 86, 0.12)",
    dp03: "0px 12px 60px 0px rgba(39, 44, 86, 0.10)",
    dp04: "box-shadow: 0px 35px 64px 0px rgba(39, 44, 86, 0.24)",
    inset: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
  },
};
