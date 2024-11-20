import { ModuleSpec } from "@/app/data/typings";
import axios from "axios";

export async function getModuleGroups() {
  try {
    const res = await axios.get("/api/module-group-specs");
    return res.data;
  } catch (error) {
    console.error("Error fetching module groups:", error);
    throw error;
  }
}
