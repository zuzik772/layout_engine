import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/client";

const supabase = createClient();
//GET module specs
export async function GET() {
  console.log("test");
  const { data: moduleGroupSpecs, error } = await supabase
    .from("module_group_specs")
    .select("*");
  if (error) return NextResponse.json(error, { status: 500 });
  const { data: moduleSpecs } = await supabase.from("module_specs").select("*");
  const data = {
    moduleGroupSpecs,
    moduleSpecs,
  };
  return NextResponse.json(data, { status: 200 });
}

//POST module specs

//PUT module specs

//DELETE module specs
