import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/client";

const supabase = createClient();

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }
  const { data: specsPositions, error } = await supabase.from("specs_positions").select("*").eq("module_group_spec_id", id);
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(specsPositions, { status: 200 });
}
