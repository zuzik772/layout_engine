import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClientWithSession } from "@/app/(auth-pages)/utils";

export async function GET(req: NextRequest) {
  const { supabase, error: sessionError } = await getSupabaseClientWithSession(req);
  if (sessionError) {
    return NextResponse.json({ error: "Error setting session" }, { status: 500 });
  }
  const { data: moduleSpecs, error } = await supabase.from("module_specs").select("*");
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(moduleSpecs, { status: 200 });
}
