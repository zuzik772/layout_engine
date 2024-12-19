import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const setAuthHeaders = (accessToken: string, refreshToken: string) => {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  axiosClient.defaults.headers.common["Refresh-Token"] = refreshToken;
};
