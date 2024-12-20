import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();

  const { data: desktopConfigIDS, error } = await supabase.from("desktop_layout_configuration").select("*");
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(desktopConfigIDS, { status: 200 });
}
