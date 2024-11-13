"use client";

import styled, { ThemeProvider } from "styled-components";
import theme from "./assets/styles/base-theme";
import { AntdConfigProvider } from "./providers/AntdConfigProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { GlobalStyle } from "./assets/styles/global-styles";
import Header from "./components/Header";
import NextTopLoader from "nextjs-toploader";
import StyledComponentsRegistry from "./styled-components";
import AuthProvider from "./providers/AuthProvider";
import DrawerProvider from "./providers/DrawerProvider";
import { QueryClientProvider } from "./providers/QueryClientProvider";

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
            <QueryClientProvider>
              <NextTopLoader height={4} showSpinner={false} />
              <GlobalStyle />
              <AuthProvider>
                <DrawerProvider>
                  <Header />
                  <WrapperCss>
                    <MainCss>{children}</MainCss>
                  </WrapperCss>
                </DrawerProvider>
              </AuthProvider>
            </QueryClientProvider>
          </AntdConfigProvider>
        </AntdRegistry>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}

export const WrapperCss = styled.div`
  display: flex;
  gap: 1rem;
`;

export const MainCss = styled.main`
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.colors.white};
`;
