import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

interface CssProps {
  variant: "published" | "draft";
}

interface TagProps extends CssProps {
  children: ReactNode;
}

function TableStatusTag(props: TagProps) {
  return <TagCss variant={props.variant}>{props.children}</TagCss>;
}

export default TableStatusTag;

const TagCss = styled.span<CssProps>`
  height: 24px;
  padding: 4px 12px;
  margin-right: 8px;
  text-transform: capitalize;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;

  ${(p) => p.variant === "published" && publishedCss}
  ${(p) => p.variant === "draft" && draftCss}
`;

const publishedCss = css`
  background: #109877;
`;

const draftCss = css`
  background: #f2f0f0;
  color: #131212;
`;
