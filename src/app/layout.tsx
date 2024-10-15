"use client";

import styled, { ThemeProvider } from "styled-components";
import theme from "./assets/styles/base-theme";
import { AntdConfigProvider } from "./providers/AntdConfigProvider";
import { GlobalStyle } from "./assets/styles/global-styles";
import Header from "./components/Header";
import SideNavigation from "./components/SideNavigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}

const WrapperCss = styled.div`
  display: flex;
  gap: ${(p) => p.theme.sizes.spacing2};
`;

const MainCss = styled.main`
  background: ${(p) => p.theme.colors.white};
  min-height: calc(100vh - ${(p) => p.theme.sizes.headerHeight});
`;
