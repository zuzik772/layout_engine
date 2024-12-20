import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/server";

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
  const supabase = createClient();

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }
  const { data: mobileConfig, error } = await supabase.from("mobile_layout_configuration").select("*").eq("spec_id", id);
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(mobileConfig, { status: 200 });
}

export async function POST(req: NextRequest, { params }: { params: { id: number } }) {
  const supabase = createClient();

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  const body = await req.json();
  const { data, error } = await supabase.from("mobile_layout_configuration").insert([body]);
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: number } }) {
  const supabase = createClient();

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  const body = await req.json();
  const { data, error } = await supabase.from("mobile_layout_configuration").upsert(body, { onConflict: "spec_id" });

  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}
