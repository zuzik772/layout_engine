"use client";

import styled, { ThemeProvider } from "styled-components";
import theme from "./assets/styles/base-theme";
import { AntdConfigProvider } from "./providers/AntdConfigProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { GlobalStyle } from "./assets/styles/global-styles";
import Header from "./components/Header";
import SideNavigation from "./components/SideNavigation";
import NextTopLoader from "nextjs-toploader";
import StyledComponentsRegistry from "./styled-components";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <AntdRegistry>
          <AntdConfigProvider>
            <NextTopLoader height={4} showSpinner={false} />
            <GlobalStyle />
            <Header />
            <WrapperCss>
              <MainCss>{children}</MainCss>
            </WrapperCss>
          </AntdConfigProvider>
        </AntdRegistry>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}

const WrapperCss = styled.div`
  display: flex;
`;

const MainCss = styled.main`
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.colors.white};
`;
