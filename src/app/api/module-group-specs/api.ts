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

export async function getModuleGroupSpecs(id: number): Promise<ModuleSpec[]> {
  try {
    console.log("id", id);
    const res = await axios.get(`/api/module-group-spec-module-specs/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching module group specs:", error);
    throw error;
  }
}
