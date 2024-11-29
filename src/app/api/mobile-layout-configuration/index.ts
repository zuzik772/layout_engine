import axios from "axios";

export async function getMobileConfigIDS(): Promise<any> {
  try {
    const res = await axios.get(`/api/mobile-layout-configuration/`);
    return res.data;
  } catch (error) {
    console.error("Error fetching mobile config:", error);
    throw error;
  }
}
