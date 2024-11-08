import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/client";

const supabase = createClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const { id } = params;
  console.log("route module group id", id);
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

  const moduleSpecIds = moduleGroupSpecModuleSpecs?.map(
    (moduleSpec) => moduleSpec.module_spec_id
  );
  console.log("moduleSpecIds", moduleSpecIds);

  const { data: moduleGroupSpecs, error: moduleSpecsError } = await supabase
    .from("module_specs")
    .select("*")
    .in("module_spec_id", moduleSpecIds);
  if (moduleSpecsError) {
    console.error(
      "Error fetching module group module specs:",
      moduleSpecsError
    );

    console.log("moduleGroupModuleSpecs", moduleGroupSpecs);
    return NextResponse.json(moduleSpecsError, { status: 500 });
  }

  console.log(moduleGroupSpecs);

  return NextResponse.json(moduleGroupSpecs, { status: 200 });
}
