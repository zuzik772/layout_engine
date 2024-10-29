import Link from "next/link";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderCss>
      <Link href="/">Logo</Link>
      <Link href="/auth/sign-in">Sign in</Link>
    </HeaderCss>
  );
};

export default Header;

const HeaderCss = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(p) => p.theme.sizes.headerHeight};
  padding: ${(p) => p.theme.sizes.spacing4};
  color: ${(p) => p.theme.colors.headerTextColor};
  background: ${(p) => p.theme.colors.headerBackground};

  a {
    color: inherit;
  }
`;
