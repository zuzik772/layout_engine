import { Metadata } from "next";
import ClientLayout from "./client-layout";
import StyledComponentsRegistry from "./styled-components";

export const metadata: Metadata = {
  title: "Layout Engine",
  description: "Personal development project for Shape Games",
  keywords: ["personal development", "shape games", "nextjs"],
};

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <StyledComponentsRegistry>
          <ClientLayout>{children}</ClientLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
