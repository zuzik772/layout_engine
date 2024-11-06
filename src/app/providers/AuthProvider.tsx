"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { createClient } from "../../../utils/supabase/client";
import { FlexCenterContainer } from "../components/layout/styling";
import LoadingSpinner from "../components/LoadingSpinner";
import { usePathname, useRouter } from "next/navigation";
import {
  AuthChangeEvent,
  Session,
  User,
  UserResponse,
} from "@supabase/auth-js";
import path from "path";

type AuthProps = {
  user: boolean;
};

const GlobalContext = createContext<AuthProps>({} as AuthProps);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const supabase = createClient();
  const [user, setUser] = useState<boolean>(false);
  const [session, setSession] = useState<AuthChangeEvent | Session | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      //   const user = await supabase.auth.getUser();
      const { data: session } = await supabase.auth.getSession();
      const sessionChanged = supabase.auth.onAuthStateChange(
        (event, session) => {
          setSession(session);
        }
      );
      const token = session.session?.access_token;
      if (pathName.startsWith("/protected") && !token) {
        setLoading(false);
        setSession(null);
        setUser(false);
        console.log("redirecting to sign-in");
        return router.push("/sign-in");
      } else if (token) {
        console.log("this is global user", user);

        setUser(!!token);
        setLoading(false);
      }
      setLoading(false);
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
    <GlobalContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useAuthProvider = () => useContext(GlobalContext);

export default AuthProvider;
