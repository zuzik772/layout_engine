import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/client";

const supabase = createClient();

export async function GET() {
  console.log("route module groups");
  const { data: moduleGroups, error } = await supabase.from("module_group_specs").select("*");
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(moduleGroups, { status: 200 });
}
