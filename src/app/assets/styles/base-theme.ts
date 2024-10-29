const defaultColors = {
  white: "#fff",
  black: "#000",

  gray50: "#fcfcfc",
  gray100: "#f6f6f6",
  gray200: "#eeeeee",
  gray300: "#d9d8d8",
  gray400: "#cccccc",
  gray500: "#a9a9a9",
  gray600: "#979797",
  gray700: "#4c4c4c",
  gray900: "#3c3b3b",

  primary300: "#5176D6",
  primary500: "#073BC5",
  primary700: "#03184F",
  primary900: "#9CB1E8",

  secondary400: "#05298A",
  secondary500: "#131212",
};

const customColors = {
  actionColor700: defaultColors.secondary400,

  loginBgColor:
    "radial-gradient(61.15% 112.82% at 31.74% 24.86%, #0732C5 0%, #0A43D9 0.01%, #0632A7 100%)",
  loginButtonBg: defaultColors.primary700,
  authSpinnerColor: defaultColors.white,

  headerTextColor: defaultColors.white,
  headerBackground: defaultColors.primary500,

  drawerHeaderBackground: defaultColors.primary500,
  drawerHeaderTextColor: defaultColors.white,
  drawerTitleColor: defaultColors.primary500,

  sidebarSectionBackground: defaultColors.primary500,
  sidebarBackground: defaultColors.secondary400,
  sidebarSubHeaderColor: defaultColors.primary900,
  sidebarLinkHover: "rgba(0, 0, 0, 0.2)",
  sidebarBorderColor: defaultColors.primary900,

  success: "#2BAC76",
  error: "#bf1919",
  errorDark: "#a20606",
  errorLight: "#de9595",
  warn: "#ffe200",
  warnMd: "#FED7AA",
  warnLight: "#FFF7ED",
  info: "#5A9CCF",
  infoLight: "#EFF6FF",
};

export const colors = {
  ...defaultColors,
  ...customColors,
};

export const sizes = {
  /** 1px */
  spacingXxs: "1px",
  /** 2px */
  spacingXs: "2px",
  /** 4px */
  spacing1: "4px",
  /** 8px */
  spacing2: "8px",
  /** 12px */
  spacing3: "12px",
  /** 16px */
  spacing4: "16px",
  /** 20px */
  spacing5: "20px",
  /** 24px */
  spacing6: "24px",
  /** 32px */
  spacing8: "32px",
  /** 40px */
  spacing10: "40px",
  /** 48px */
  spacing12: "48px",
  /** 56px */
  spacing14: "56px",
  /** 64px */
  spacing16: "64px",
  /** 72px */
  spacing18: "72px",
  /** 80px */
  spacing20: "80px",
  /** spacing24 */
  spacing24: "96px",
  /** 112px */
  spacing28: "112px",
  /** 128px */
  spacing32: "128px",
  /** 144px */
  spacing36: "144px",
  /** 160px */
  spacing40: "160px",
  /** 176px */
  spacing44: "176px",
  /** 192px */
  spacing48: "192px",

  gutter: "8px",
  gutterX2: "16px",

  /** 2px */
  borderRadiusXs: "2px",
  /** 4px */
  borderRadiusSm: "4px",
  /** 6px */
  borderRadiusBase: "6px",
  /** 12px */
  borderRadiusLg: "8px",
  /** 16px */
  borderRadiusXl: "16px",
  /** 99999px */
  borderRadiusFull: "99999px",

  /** 66px */
  headerHeight: "56px",
  /** 30px */
  headerLogoHeight: "24px",

  /** 250px */
  sidebarWidth: "250px",
  /** 60px */
  sidebarSectionWidth: "60px",
};

export const font = {
  primaryFontFamily: "Inter, Arial",
  weightRegular: "400",
  weightSemiBold: "600",
  weightBold: "700",
};

export const transitions = {
  base: "ease-in-out",
  cubicBezier: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  transform: "translateY(-0.15em)",
};

export const breakpointSizes = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const breakpoints = {
  sm: `@media (min-width: ${breakpointSizes.sm}px)`,
  md: `@media (min-width: ${breakpointSizes.md}px)`,
  lg: `@media (min-width: ${breakpointSizes.lg}px)`,
  xl: `@media (min-width: ${breakpointSizes.xl}px)`,
  maxSm: `@media (max-width: ${breakpointSizes.sm - 1}px)`,
  maxMd: `@media (max-width: ${breakpointSizes.md - 1}px)`,
  maxLg: `@media (max-width: ${breakpointSizes.lg - 1}px)`,
};

const theme = {
  colors,
  sizes,
  font,
  transitions,
  breakpoints,
};

export default theme;
