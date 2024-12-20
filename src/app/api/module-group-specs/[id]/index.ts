import { ModuleSpec } from "@/app/data/typings";
import axios from "axios";

export async function getModuleGroupSpecs(id: number): Promise<ModuleSpec[]> {
  try {
    const res = await axios.get(`/api/module-group-specs/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching module group specs:", error);
    throw error;
  }
}

export async function addModuleGroupSpec(id: number, module_spec_id: string) {
  try {
    console.log("module group id", id, "module spec id", module_spec_id);
    const res = await axios.post(`/api/module-group-specs/${id}`, {
      module_spec_id,
    });
    return res.data;
  } catch (error) {
    console.error("Error posting module group specs:", error);
    throw error;
  }
}

export async function deleteModuleGroupSpec(id: number) {
  try {
    console.log("delete module group spec", id);
    const res = await axios.delete(`/api/module-group-specs/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting module group specs:", error);
    throw error;
  }
}

export async function updateModuleGroupSpec(spec: ModuleSpec) {
  try {
    const { id } = spec;
    const res = await axios.put(`/api/module-group-specs/${id}`, spec);
    return res.data;
  } catch (error) {
    console.error("Error updating module group specs:", error);
    throw error;
  }
}
