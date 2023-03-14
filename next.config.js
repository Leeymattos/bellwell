// next.config.js
const nextConfig = {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'assets.vercel.com',
      port: '',
      pathname: '/image/upload/**',
    },
  ],
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
};