module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.hashnode.com",
        port: "",
      },
    ],
  },
  reactStrictMode: true,
};

// module.exports = {
//   images: {
//     domains: [
//       "github-readme-streak-stats-salesp07.vercel.app",
//       "github-readme-stats-salesp07.vercel.app",
//       "ghchart.rshah.org",
//     ],
//   },
// };


// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "github-readme-streak-stats-salesp07.vercel.app",
      "github-readme-stats-salesp07.vercel.app",
      "ghchart.rshah.org",
    ],
  },
};

module.exports = nextConfig;



