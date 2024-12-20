"use client";
import React, { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../(auth-pages)/use-auth";
import { FlexCenterContainer } from "../components/layout/styling";
import LoadingSpinner from "../components/LoadingSpinner";

interface AuthProps {
  user: boolean;
}

const GlobalContext = createContext<AuthProps>({} as AuthProps);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    if (!loading) {
      if (pathName.startsWith("/protected") && !user) {
        console.log("redirecting to sign-in");
        router.push("/sign-in");
      } else if (pathName === "/" && user) {
        router.push("/");
      }
    }
  }, [loading, user, pathName, router]);

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
