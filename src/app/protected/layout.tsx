"use client";

import styled from "styled-components";
import SideNavigation from "../components/SideNavigation";
import { createClient } from "../../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { FlexCenterContainer } from "../components/layout/styling";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user", user);
      if (!user) {
        router.push("/sign-in");
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <FlexCenterContainer>
        <LoadingSpinner />
      </FlexCenterContainer>
    );
  }

  return (
    <WrapperCss>
      <SideNavigation />
      <MainCss>{children}</MainCss>
    </WrapperCss>
  );
}

const WrapperCss = styled.div`
  display: flex;
  gap: 1rem;
`;

const MainCss = styled.main`
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.colors.white};
`;
