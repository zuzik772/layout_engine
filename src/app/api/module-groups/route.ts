import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { data: moduleGroups, error } = await supabase.from("module_groups").select("*");
  if (error) {
    console.error("Error fetching module groups:", error);
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json(moduleGroups, { status: 200 });
}
