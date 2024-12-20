import { DesktopLayoutConfig } from "@/app/data/typings";
import axios from "axios";

export async function getDesktopConfig(id: number): Promise<DesktopLayoutConfig> {
  try {
    const res = await axios.get(`/api/desktop-layout-configuration/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching desktop config:", error);
    throw error;
  }
}

export async function addDesktopConfig(id: number, config: DesktopLayoutConfig) {
  try {
    const res = await axios.post(`/api/desktop-layout-configuration/${id}`, config);
    return res.data;
  } catch (error) {
    console.error("Error posting desktop config:", error);
    throw error;
  }
}

export async function updateDesktopConfig(id: number, config: DesktopLayoutConfig) {
  try {
    console.log("about to update following config", config);
    const res = await axios.put(`/api/desktop-layout-configuration/${id}`, config);
    return res.data;
  } catch (error) {
    console.error("Error updating desktop config:", error);
    throw error;
  }
}
