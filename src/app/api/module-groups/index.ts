import axios from "axios";

import { ModuleGroup } from "@/app/data/typings";

export async function getModuleGroups(): Promise<ModuleGroup[]> {
  try {
    const res = await axios.get("/api/module-groups");
    return res.data;
  } catch (error) {
    console.error("Error fetching module groups:", error);
    throw error;
  }
}
