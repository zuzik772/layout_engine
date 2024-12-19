import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClientWithSession } from "@/app/(auth-pages)/utils";

export async function GET(req: NextRequest) {
  const { supabase, error: sessionError } = await getSupabaseClientWithSession(req);
  if (sessionError) {
    return NextResponse.json({ error: "Error setting session" }, { status: 500 });
  }

  const { data: desktopConfigIDS, error } = await supabase.from("desktop_layout_configuration").select("*");
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(desktopConfigIDS, { status: 200 });
}
