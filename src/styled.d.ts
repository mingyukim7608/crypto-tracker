import "styled-components";

declare module "styled-components" {
  interface DefaultTheme {
    themeName: string;
    bgColor: string;
    textColor: string;
    accentColor: string;
    contentBoxColor: string;
  }
}
