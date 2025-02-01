import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['placehold.co','unsplash.com','dclrlzd4gl55u.cloudfront.net', 'encrypted-tbn0.gstatic.com'],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      }
    ]
  },
experimental: {
  ppr: "incremental",
},
devIndicators: {
  appIsrStatus: true,
  buildActivity: true,
  buildActivityPosition: "bottom-right",
}
};

export default nextConfig;
