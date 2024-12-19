import { useEffect, useMemo, useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import { setAuthHeaders } from "./axiosClient";

export function useAuth() {
  const supabase = useMemo(() => createClient(), []);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: sessionData, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error fetching session:", error);
          return;
        }

        const userAccessToken = sessionData?.session?.access_token ?? null;
        const userRefreshToken = sessionData?.session?.refresh_token ?? null;

        setAccessToken(userAccessToken);
        setRefreshToken(userRefreshToken);

        if (userAccessToken && userRefreshToken) {
          setAuthHeaders(userAccessToken, userRefreshToken);
        }
      } catch (err) {
        console.error("Unexpected error fetching session:", err);
      }
    };

    fetchSession();
  }, [supabase]);

  return { accessToken, refreshToken };
}
