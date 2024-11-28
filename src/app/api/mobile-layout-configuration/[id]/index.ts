import { MobileLayoutConfig } from "@/app/data/typings";
import axios from "axios";

export async function getMobileConfig(id: number): Promise<MobileLayoutConfig> {
  try {
    const res = await axios.get(`/api/mobile-layout-configuration/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching mobile config:", error);
    throw error;
  }
}

export async function addMobileConfig(id: number, config: MobileLayoutConfig) {
  try {
    const res = await axios.post(`/api/mobile-layout-configuration/${id}`, config);
    return res.data;
  } catch (error) {
    console.error("Error posting mobile config:", error);
    throw error;
  }
}
