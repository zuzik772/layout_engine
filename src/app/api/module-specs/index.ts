import { axiosClient } from "@/app/(auth-pages)/axiosClient";
import { ModuleSpec } from "@/app/data/typings";

export async function getModuleSpecs(): Promise<ModuleSpec[]> {
  try {
    const res = await axiosClient.get("/api/module-specs");
    return res.data;
  } catch (error) {
    console.error("Error fetching module specs:", error);
    throw error;
  }
}
