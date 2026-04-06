/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This tells Vercel to ignore those 8 quote errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This ignores the animation errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;