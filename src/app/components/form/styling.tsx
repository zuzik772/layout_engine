"use client";

import { Button } from "antd";
import styled from "styled-components";

export const FlexColCss = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.sizes.spacing2};
  min-width: 260px;
`;
export const HeadingCss = styled.h2`
  color: ${(p) => p.theme.colors.primary500};
  text-align: center;
`;

export const LargeHeadingCss = styled(HeadingCss)`
  font-size: ${(p) => p.theme.sizes.spacing12};
`;

export const DescriptionCss = styled.p`
  color: ${(p) => p.theme.colors.gray500};
  text-align: center;
`;

export const ButtonCss = styled(Button)`
  margin-bottom: ${(p) => p.theme.sizes.spacing2};
`;
