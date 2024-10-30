import Link from "next/link";
import styled from "styled-components";
import { signOutAction } from "../actions";
import { ButtonCss } from "../(auth-pages)/sign-in/page";

const SideNavigation = () => {
  return (
    <WrapperCss>
      <SideNavigationCss>
        <div>
          <SideNavigationItemCss>
            <Link href={"/protected"}>Module CMS</Link>
          </SideNavigationItemCss>
          <SideNavigationItemCss>
            <Link href={"/protected/preview"}>Preview</Link>
          </SideNavigationItemCss>
        </div>
        <form action={signOutAction}>
          <ButtonCss block type="primary" htmlType="submit">
            Sign out
          </ButtonCss>
        </form>
      </SideNavigationCss>
    </WrapperCss>
  );
};

export default SideNavigation;

const WrapperCss = styled.nav`
  position: relative;
  box-sizing: border-box;
  contain: strict;

  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  flex-direction: column;
  height: calc(100vh - ${(p) => p.theme.sizes.headerHeight});

  &:hover {
    overflow-y: scroll;
    /* scrollbar is hidden but the element is still scrollable */
    scrollbar-width: none;
  }

  ul {
    list-style: none;
    margin: 0;
  }

  width: ${(p) => p.theme.sizes.sidebarWidth};
  background-color: ${(p) => p.theme.colors.sidebarBackground};
`;

const SideNavigationCss = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${(p) => p.theme.sizes.spacing4};
  padding-top: ${(p) => p.theme.sizes.spacingXs};
  flex-grow: 1;
  height: 100%;
`;

const SideNavigationItemCss = styled.li`
  line-height: 16px;
  color: ${(p) => p.theme.colors.white};
  padding-top: ${(p) => p.theme.sizes.spacingXs};
`;
