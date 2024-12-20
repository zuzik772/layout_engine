import { useEffect, useState, useMemo } from "react";
import { createClient } from "../../../utils/supabase/client";
import { setAuthHeaders } from "./axiosClient";
import { getAuthCookies, setAuthCookies } from "./cookies";

export function useAuth() {
  const supabase = useMemo(() => createClient(), []);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw new Error(sessionError.message);
        }
        //get the tokens from session, otherwise fallback to cookies
        const userAccessToken = sessionData?.session?.access_token ?? getAuthCookies()?.accessToken ?? null;
        const userRefreshToken = sessionData?.session?.refresh_token ?? getAuthCookies()?.refreshToken ?? null;

        if (userAccessToken && userRefreshToken) {
          setAuthHeaders(userAccessToken as string, userRefreshToken as string);
          setAuthCookies(userAccessToken as string, userRefreshToken as string); // store tokens in secure cookies
          setUser(true);
        } else {
          setUser(false);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setUser(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [supabase]);

  return { user, loading };
}
