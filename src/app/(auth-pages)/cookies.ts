import { getCookie, setCookie } from "cookies-next";

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
  setCookie("accessToken", accessToken, {
    maxAge: 60 * 60, // 1 hour
    path: "/", //valid for all routes
    httpOnly: true, // Prevents cookies from being accessed via client-side JavaScript, reducing the risk of XSS attacks
    secure: process.env.NODE_ENV === "production", // the cookie is only sent over HTTPS in production environments
    sameSite: "strict", // restricting cross-site requests from sending the cookies
  });

  setCookie("refreshToken", refreshToken, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const getAuthCookies = () => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  return { accessToken, refreshToken };
};
