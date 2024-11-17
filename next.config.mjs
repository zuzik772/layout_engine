import withFonts from "next-fonts";
import withPlugins from "next-compose-plugins";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
};

export default withPlugins([withFonts], nextConfig);
