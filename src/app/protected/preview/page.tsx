// "use client";

import { createClient } from "../../../../utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data: moduleSpecs } = await supabase.from("module_specs").select();
  console.log(moduleSpecs?.length);
  return <pre>{JSON.stringify(moduleSpecs, null, 2)}</pre>;
}
