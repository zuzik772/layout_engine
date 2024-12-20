import axios from "axios";

export async function getDesktopConfigIDS(): Promise<any> {
  try {
    const res = await axios.get(`/api/desktop-layout-configuration/`);
    return res.data;
  } catch (error) {
    console.error("Error fetching desktop config:", error);
    throw error;
  }
}
