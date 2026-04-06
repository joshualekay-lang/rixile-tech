/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This is the magic line that ignores the errors
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;