import React from "react";
import { ConfigProvider, App } from "antd";
import { useTheme } from "styled-components";

interface AntdConfigProviderProps {
  children: React.ReactNode;
}

export const AntdConfigProvider = ({ children }: AntdConfigProviderProps) => {
  const { colors, font } = useTheme();

  return (
    <ConfigProvider
      theme={{
        inherit: true,
        token: {
          colorPrimary: colors.primary500,
          colorInfo: colors.primary500,
          colorError: colors.error,
          fontFamily: font.primaryFontFamily,
        },
        components: {
          Message: {
            colorSuccess: colors.success,
            colorError: colors.error,
            colorInfo: colors.info,
            fontFamily: font.primaryFontFamily,
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
};
