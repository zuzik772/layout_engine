import Link from "next/link";
import styled from "styled-components";
import { Button, Form } from "antd";
import { useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";

const SideNavigation = () => {
  const supabase = createClient();
  const router = useRouter();
  const onFinish = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
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
        <Form name="sign-out" initialValues={{ remember: true }} onFinish={onFinish}>
          <Button block type="primary" htmlType="submit">
            Sign out
          </Button>
        </Form>
      </SideNavigationCss>
    </WrapperCss>
  );
};

export default SideNavigation;

export const WrapperCss = styled.nav`
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

  width: 200px;
  min-width: 200px;
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
