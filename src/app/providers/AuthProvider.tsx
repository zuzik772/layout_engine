"use client";
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FlexCenterContainer } from "../components/layout/styling";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { createClient } from "../../../utils/supabase/client";

interface AuthProps {
  user: boolean;
}

const GlobalContext = createContext<AuthProps>({} as AuthProps);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const supabase = createClient();
  const [user, setUser] = useState<boolean>(false);
  const [session, setSession] = useState<AuthChangeEvent | Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data: session } = await supabase.auth.getSession();

      const token = session.session?.access_token;
      if (pathName.startsWith("/protected") && !token) {
        setLoading(false);
        setSession(null);
        setUser(false);
        console.log("redirecting to sign-in");
        return router.push("/sign-in");
      } else if (token) {
        setUser(!!token);
        setLoading(false);
      }
      setLoading(false);
    };
    checkUser();
  }, [router, pathName, supabase.auth, user]);

  if (loading) {
    return (
      <FlexCenterContainer>
        <LoadingSpinner />
      </FlexCenterContainer>
    );
  }

  return <GlobalContext.Provider value={{ user }}>{children}</GlobalContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(GlobalContext);
};

export default AuthProvider;
