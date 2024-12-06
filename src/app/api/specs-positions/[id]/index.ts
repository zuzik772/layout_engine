import { SpecPosition } from "@/app/data/typings";
import axios from "axios";

export async function getSpecsPositions(id: number): Promise<SpecPosition[]> {
  try {
    const res = await axios.get(`/api/specs-positions/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching specs positions:", error);
    throw error;
  }
}

export async function updateSpecsPositions(id: number, data: SpecPosition[]): Promise<void> {
  try {
    console.log("data to be upserted", data);
    await axios.put(`/api/specs-positions/${id}`, data);
  } catch (error) {
    console.error("Error updating specs positions:", error);
    throw error;
  }
}

export async function addSpecPosition(id: number, specPosition: SpecPosition): Promise<SpecPosition> {
  try {
    const res = await axios.post(`/api/specs-positions/${id}`, specPosition);
    return res.data;
  } catch (error) {
    console.error("Error posting spec position:", error);
    throw error;
  }
}
