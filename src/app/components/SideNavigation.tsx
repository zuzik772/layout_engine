import styled from "styled-components";

const SideNavigation = () => {
  return (
    <WrapperCss>
      <SideNavigationCss>
        <SideNavigationItemCss>Module CMS</SideNavigationItemCss>
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
  padding: ${(p) => p.theme.sizes.spacing4};
  padding-top: ${(p) => p.theme.sizes.spacingXs};
  flex-grow: 1;
`;

const SideNavigationItemCss = styled.li`
  line-height: 16px;
  color: ${(p) => p.theme.colors.white};
  padding-top: ${(p) => p.theme.sizes.spacingXs};
`;
