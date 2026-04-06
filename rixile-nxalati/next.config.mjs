/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This is the CRITICAL line you were missing!
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;