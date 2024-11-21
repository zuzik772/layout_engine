import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/client";

const supabase = createClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }

  const { data: moduleGroupSpecModuleSpecs, error: moduleGroupSpecError } =
    await supabase
      .from("module_group_spec_module_specs")
      .select("*")
      .eq("module_group_spec_id", id);

  if (moduleGroupSpecError) {
    return NextResponse.json(moduleGroupSpecError, { status: 500 });
  }

  return NextResponse.json(moduleGroupSpecModuleSpecs, { status: 200 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const { id } = params;
  const { module_spec_id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }
  const { data, error } = await supabase
    .from("module_group_spec_module_specs")
    .insert([{ module_spec_id, module_group_spec_id: id }]);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

//delete route
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const { id } = params;

  console.log("DELETE module group spec", id);

  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }
  const { data, error } = await supabase
    .from("module_group_spec_module_specs")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
