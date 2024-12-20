import { useEffect, useState, useMemo } from "react";
import { createClient } from "../../../utils/supabase/client";

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
        const userAccessToken = sessionData?.session?.access_token ?? null;
        const userRefreshToken = sessionData?.session?.refresh_token ?? null;

        if (userAccessToken && userRefreshToken) {
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
