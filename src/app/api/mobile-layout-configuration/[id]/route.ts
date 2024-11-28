import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/client";

const supabase = createClient();

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }
  console.log("route mobile layout configuration", id);
  const { data: mobileConfig, error } = await supabase.from("mobile_layout_configuration").select("*").eq("spec_id", id);
  console.log("new mobileConfig", mobileConfig);
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(mobileConfig, { status: 200 });
}

export async function POST(req: NextRequest, { params }: { params: { id: number } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  const body = await req.json();

  console.log("whats body", body);
  const { data, error } = await supabase.from("mobile_layout_configuration").insert([body]);
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}
