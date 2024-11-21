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
