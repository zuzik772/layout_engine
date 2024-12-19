import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClientWithSession } from "@/app/(auth-pages)/utils";

export async function GET(req: NextRequest) {
  const { supabase, error: sessionError } = await getSupabaseClientWithSession(req);
  if (sessionError) {
    return NextResponse.json({ error: "Error setting session" }, { status: 500 });
  }

  const { data: moduleGroups, error } = await supabase.from("module_groups").select("*");
  if (error) {
    console.error("Error fetching module groups:", error);
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(moduleGroups, { status: 200 });
}
