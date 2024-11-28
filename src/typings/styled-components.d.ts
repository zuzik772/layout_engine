import theme from "@/app/assets/styles/base-theme";

type Theme = typeof theme;

// From https://git.io/fjH9b
declare module "styled-components" {
  interface DefaultTheme extends Theme {}
}
