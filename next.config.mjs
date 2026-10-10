/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Dev me browser seedha Unsplash se image leta hai (server fetch timeout se bachne ke liye)
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;