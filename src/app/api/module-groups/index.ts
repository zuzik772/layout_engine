import { axiosClient } from "@/app/(auth-pages)/axiosClient";
import { ModuleGroup } from "@/app/data/typings";

export async function getModuleGroups(): Promise<ModuleGroup[]> {
  try {
    const res = await axiosClient.get("/api/module-groups");
    return res.data;
  } catch (error) {
    console.error("Error fetching module groups:", error);
    throw error;
  }
}
