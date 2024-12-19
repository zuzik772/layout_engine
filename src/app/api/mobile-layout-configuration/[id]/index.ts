import { MobileLayoutConfig } from "@/app/data/typings";
import { axiosClient } from "@/app/(auth-pages)/axiosClient";

export async function getMobileConfig(id: number): Promise<MobileLayoutConfig> {
  try {
    const res = await axiosClient.get(`/api/mobile-layout-configuration/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching mobile config:", error);
    throw error;
  }
}

export async function addMobileConfig(id: number, config: MobileLayoutConfig) {
  try {
    const res = await axiosClient.post(`/api/mobile-layout-configuration/${id}`, config);
    return res.data;
  } catch (error) {
    console.error("Error posting mobile config:", error);
    throw error;
  }
}

export async function updateMobileConfig(id: number, config: MobileLayoutConfig) {
  try {
    console.log("about to update following config", config);
    const res = await axiosClient.put(`/api/mobile-layout-configuration/${id}`, config);
    return res.data;
  } catch (error) {
    console.error("Error updating mobile config:", error);
    throw error;
  }
}
