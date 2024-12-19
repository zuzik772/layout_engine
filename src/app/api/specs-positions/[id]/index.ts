import { axiosClient } from "@/app/(auth-pages)/axiosClient";
import { SpecPosition } from "@/app/data/typings";

export async function getSpecsPositions(id: number): Promise<SpecPosition[]> {
  try {
    const res = await axiosClient.get(`/api/specs-positions/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching specs positions:", error);
    throw error;
  }
}

export async function updateSpecsPositions(id: number, data: SpecPosition[]): Promise<void> {
  try {
    console.log("data to be upserted", data);
    await axiosClient.put(`/api/specs-positions/${id}`, data);
  } catch (error) {
    console.error("Error updating specs positions:", error);
    throw error;
  }
}
