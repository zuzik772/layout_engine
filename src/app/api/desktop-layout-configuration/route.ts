import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/client";

const supabase = createClient();

export async function GET() {
  const { data: desktopConfigIDS, error } = await supabase.from("desktop_layout_configuration").select("*");
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(desktopConfigIDS, { status: 200 });
}
