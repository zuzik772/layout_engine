import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/client";

const supabase = createClient();

export async function GET() {
  const { data: allModuleGroupsSpecs, error } = await supabase
    .from("module_group_spec_module_specs")
    .select("*");
  if (error) return NextResponse.json(error, { status: 500 });

  const moduleGroupModuleSpecIds = allModuleGroupsSpecs.map(
    (moduleGroupSpecId) => moduleGroupSpecId.module_group_spec_id
  );
  //   console.log("moduleGroupModuleSpecIds", moduleGroupModuleSpecIds);

  const moduleSpecIds = allModuleGroupsSpecs.map(
    (moduleSpecId) => moduleSpecId.module_spec_id
  );
  //   console.log("moduleSpecIds", moduleSpecIds);

  const { data: moduleGroupSpecs, error: moduleGroupSpecsError } =
    await supabase
      .from("module_specs")
      .select("*")
      .in("module_spec_id", moduleSpecIds);

  if (moduleGroupSpecsError) {
    return NextResponse.json(moduleGroupSpecsError, { status: 500 });
  }
  return NextResponse.json([moduleGroupModuleSpecIds, moduleGroupSpecs], {
    status: 200,
  });
}
