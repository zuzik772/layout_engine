import axios from "axios";

import { ModuleSpec } from "@/app/data/typings";

export async function getModuleSpecs(): Promise<ModuleSpec[]> {
  try {
    const res = await axios.get("/api/module-specs");
    return res.data;
  } catch (error) {
    console.error("Error fetching module specs:", error);
    throw error;
  }
}
