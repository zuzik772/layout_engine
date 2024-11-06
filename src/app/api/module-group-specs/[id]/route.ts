import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/client";

const supabase = createClient();

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: number } }
// ) {
//   const { id } = params;
//   try {
//     const task = await prisma.task.findUnique({ where: { id: Number(id) } });
//     return NextResponse.json(task);
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error fetching task" },
//       { status: 500 }
//     );
//   }
// }
// GET module group spec
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

  const { data: moduleGroupModuleSpecs, error: moduleSpecsError } =
    await supabase
      .from("module_specs")
      .select("*")
      .in("module_spec_id", moduleSpecIds);
  if (moduleSpecsError) {
    console.error(
      "Error fetching module group module specs:",
      moduleSpecsError
    );
    return NextResponse.json(moduleSpecsError, { status: 500 });
  }

  console.log(moduleGroupModuleSpecs);

  return NextResponse.json(moduleGroupModuleSpecs, { status: 200 });
}
