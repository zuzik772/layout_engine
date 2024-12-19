import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

//used for API routes and server-side functions.
export const getSupabaseClientWithSession = async (req: NextRequest) => {
  const accessToken = req.headers.get("Authorization")?.replace("Bearer ", "");
  const refreshToken = req.headers.get("Refresh-Token");

  if (!accessToken) {
    return { error: NextResponse.json({ error: "Missing access token" }, { status: 401 }) };
  }
  if (!refreshToken) {
    return { error: NextResponse.json({ error: "Missing refresh token" }, { status: 401 }) };
  }

  const supabase = createClient();
  const { data: session, error: sessionError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (sessionError) {
    console.error("Error setting session:", sessionError);
    return { error: NextResponse.json({ error: "Error setting session" }, { status: 500 }) };
  }

  return { supabase };
};
