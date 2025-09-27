/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.34.162.37'],
  images: {
    qualities: [75, 90, 95, 100]
  },
  // Let Next.js handle devIndicators with default settings
};

export default nextConfig;