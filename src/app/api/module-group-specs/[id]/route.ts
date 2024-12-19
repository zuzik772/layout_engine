import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClientWithSession } from "@/app/(auth-pages)/utils";

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
  const { supabase, error: sessionError } = await getSupabaseClientWithSession(req);
  if (sessionError) {
    return NextResponse.json({ error: "Error setting session" }, { status: 500 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  const { data: moduleGroupSpecModuleSpecs, error: moduleGroupSpecError } = await supabase
    .from("module_group_specs")
    .select("*")
    .eq("module_group_id", id);
  if (moduleGroupSpecError) {
    return NextResponse.json(moduleGroupSpecError, { status: 500 });
  }

  return NextResponse.json(moduleGroupSpecModuleSpecs, { status: 200 });
}

export async function POST(req: NextRequest, { params }: { params: { id: number } }) {
  const { supabase, error: sessionError } = await getSupabaseClientWithSession(req);
  if (sessionError) {
    return NextResponse.json({ error: "Error setting session" }, { status: 500 });
  }

  const { id } = params;
  const { module_spec_id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }
  const { data, error } = await supabase.from("module_group_specs").insert([{ module_spec_id, module_group_id: id }]);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

//delete route
export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {
  const { supabase, error: sessionError } = await getSupabaseClientWithSession(req);
  if (sessionError) {
    return NextResponse.json({ error: "Error setting session" }, { status: 500 });
  }

  const { id } = params;

  console.log("DELETE module group spec", id);

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }
  const { data, error } = await supabase.from("module_group_specs").delete().eq("id", id);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {
  const { supabase, error: sessionError } = await getSupabaseClientWithSession(req);
  if (sessionError) {
    return NextResponse.json({ error: "Error setting session" }, { status: 500 });
  }

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  const body: boolean = await req.json();

  const { data, error } = await supabase.from("module_group_specs").upsert(body, { onConflict: "id" });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
