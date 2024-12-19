import { axiosClient } from "@/app/(auth-pages)/axiosClient";

export async function getMobileConfigIDS(): Promise<any> {
  try {
    const res = await axiosClient.get(`/api/mobile-layout-configuration/`);
    return res.data;
  } catch (error) {
    console.error("Error fetching mobile config:", error);
    throw error;
  }
}
