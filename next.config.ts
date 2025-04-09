import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   async redirects() {
      return [
         {
            source: "/",
            destination: "/projects",
            permanent: true, // 308 status code
         },
      ];
   },
   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/,
         use: ["url-loader"],
      });

      return config;
   },
   experimental: {
      turbo: {
         rules: {
            "*.svg": {
               loaders: ["url-loader"],
               as: "*.js",
            },
         },
      },
   },
   images: { unoptimized: true },
   output: "standalone",
};

export default nextConfig;
