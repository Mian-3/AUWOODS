/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/collections", destination: "/collections/all", permanent: false },
      { source: "/products", destination: "/collections/all", permanent: false },
    ];
  },
  images: {
    // Dev me browser seedha Unsplash se image leta hai (server fetch timeout se bachne ke liye)
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;