import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: "/chords",
        destination: "https://chords.venyavekk.com",
        permanent: true
      },
      {
        source: "/chords/about",
        destination: "https://chords.venyavekk.com/about",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
