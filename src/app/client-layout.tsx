"use client";

import styled, { ThemeProvider } from "styled-components";
import theme from "./assets/styles/base-theme";
import { AntdConfigProvider } from "./providers/AntdConfigProvider";
import { GlobalStyle } from "./assets/styles/global-styles";
import Header from "./components/Header";
import SideNavigation from "./components/SideNavigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <AntdConfigProvider>
        <GlobalStyle />
        <Header />
        <WrapperCss>
          <SideNavigation />
          <MainCss>{children}</MainCss>
        </WrapperCss>
      </AntdConfigProvider>
    </ThemeProvider>
  );
}

const WrapperCss = styled.div`
  display: flex;
  gap: ${(p) => p.theme.sizes.spacing2};
`;

const MainCss = styled.main`
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.colors.white};
  min-height: calc(100vh - ${(p) => p.theme.sizes.headerHeight});
  padding-bottom: 2rem;
`;
