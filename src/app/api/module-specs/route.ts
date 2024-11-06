import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/client";

const supabase = createClient();
//GET module specs
export async function GET() {
  const { data: moduleSpecs, error } = await supabase
    .from("module_specs")
    .select("*");
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(moduleSpecs, { status: 200 });
}

//POST module specs

//PUT module specs

//DELETE module specs
