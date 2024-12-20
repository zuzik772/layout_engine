import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { data: moduleSpecs, error } = await supabase.from("module_specs").select("*");
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(moduleSpecs, { status: 200 });
}
