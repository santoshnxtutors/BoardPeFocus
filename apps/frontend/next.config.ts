import type { NextConfig } from "next";
import pageManifest from "./src/data/generated/page-manifest.json";
import { getCommercialRedirects } from "./src/lib/url-policy";

const boardSlugs = ["cbse", "icse", "isc", "igcse", "ib"] as const;
const boardClassParams = [
  { board: "cbse", classLevel: "class-10" },
  { board: "cbse", classLevel: "class-12" },
  { board: "icse", classLevel: "class-10" },
  { board: "isc", classLevel: "class-12" },
  { board: "igcse", classLevel: "class-10" },
  { board: "ib", classLevel: "ibdp" },
] as const;
const classHubSlugs = ["class-10", "class-12"] as const;

function getBoardPath(board: string) {
  return `/boards/${board}/home-tutors`;
}

function getLegacyBoardPath(board: string) {
  return `/boards/${board}`;
}

function getBoardClassPath(board: string, classLevel: string) {
  return `/boards/${board}/${classLevel}/home-tutors`;
}

function getLegacyBoardClassPath(board: string, classLevel: string) {
  return `/boards/${board}/${classLevel}`;
}

function getClassHubPath(classLevel: string) {
  return `/classes/${classLevel}/home-tutors`;
}

function getLegacyClassHubPath(classLevel: string) {
  return `/classes/${classLevel}`;
}

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async rewrites() {
    const backendUrl =
      process.env.BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://127.0.0.1:3001/api/v1";

    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${backendUrl}/:path*`,
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
    ];
  },
  async redirects() {
    const explicitCommercialRedirects = [
      ...boardSlugs.map((board) => ({
        source: getLegacyBoardPath(board),
        destination: getBoardPath(board),
        statusCode: 301 as const,
      })),
      ...boardClassParams.map(({ board, classLevel }) => ({
        source: getLegacyBoardClassPath(board, classLevel),
        destination: getBoardClassPath(board, classLevel),
        statusCode: 301 as const,
      })),
      ...classHubSlugs.map((classLevel) => ({
        source: getLegacyClassHubPath(classLevel),
        destination: getClassHubPath(classLevel),
        statusCode: 301 as const,
      })),
      {
        source: "/tutors/:tutorSlug((?!sitemap\\.xml$)[^/]+)",
        destination: "/tutors/:tutorSlug/home-tutors",
        statusCode: 301 as const,
      },
    ];

    return [...explicitCommercialRedirects, ...getCommercialRedirects(pageManifest)];
  },
};

export default nextConfig;
