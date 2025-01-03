import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/server";

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
  const supabase = createClient();

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  const { data: specsPositions, error } = await supabase.from("specs_positions").select("*").eq("module_group_id", id);
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(specsPositions, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {
  const supabase = createClient();

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  const body = await req.json();
  // Validate the body to ensure required fields are present
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Body should be an array of records" }, { status: 400 });
  }
  console.log("body", body);

  const { data: specsPositions, error } = await supabase.from("specs_positions").upsert(body, {
    onConflict: "module_group_specs_id",
  });

  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(specsPositions, { status: 200 });
}
