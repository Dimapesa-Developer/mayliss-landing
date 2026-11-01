import type { NextConfig } from "next";

// En GitHub Pages el sitio es estático y vive en un subdirectorio (/mayliss-landing).
// El workflow define GITHUB_PAGES=true y NEXT_PUBLIC_BASE_PATH; en local todo queda como un Next.js normal.
const githubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(githubPages ? { output: "export", trailingSlash: true } : {}),
  basePath,
  images: {
    // Pages no tiene servidor para optimizar imágenes
    unoptimized: githubPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "renta-de-vestidos-production.up.railway.app",
        pathname: "/media/vestidos/**",
      },
    ],
  },
};

export default nextConfig;
