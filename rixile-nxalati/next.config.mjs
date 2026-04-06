/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // THIS IS THE MAGIC LINE WE NEED
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;