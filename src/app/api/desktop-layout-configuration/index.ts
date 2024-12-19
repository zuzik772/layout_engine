import { axiosClient } from "@/app/(auth-pages)/axiosClient";

export async function getDesktopConfigIDS(): Promise<any> {
  try {
    const res = await axiosClient.get(`/api/desktop-layout-configuration/`);
    return res.data;
  } catch (error) {
    console.error("Error fetching desktop config:", error);
    throw error;
  }
}
