"use client";

import { FlexCenterContainer } from "../components/layout/styling";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <FlexCenterContainer>{children}</FlexCenterContainer>;
}
