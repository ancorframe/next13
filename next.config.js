/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);
const nextConfig = {
  experimental: { appDir: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "robohash.org",
      },
    ],
  },
  output: "standalone",
  // async rewrites() {
  //   return [
  //     {
  //       source: "/auth/:path*",
  //       destination: "http://localhost:4499/api/auth:path*",
  //     },
  //   ];
  // },
};

module.exports = withNextIntl(nextConfig);
