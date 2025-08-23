/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [ 
      "192.168.68.112",
      "127.0.0.1",
      "plum-caterpillar-579427.hostingersite.com"
    ],
  },
};

export default nextConfig;
